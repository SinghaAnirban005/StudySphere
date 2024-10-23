import React, { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { useParams } from 'react-router-dom';
import { Comment } from 'react-loader-spinner';
import { jsPDF } from 'jspdf';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

const Whiteboard = () => {
    const [lines, setLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [brushRadius, setBrushRadius] = useState(10);
    const [brushColor, setBrushColor] = useState("#444");
    const [error, setError] = useState(null);
    const { groupId } = useParams();
    const stageRef = useRef();

    const saveWhiteboard = async () => {
        const dataURL = JSON.stringify(lines);

        try {
            await axios.post(`${apiUrl}/api/v1/whiteboard/saveW/${groupId}`, { whiteboardState: dataURL });
        } catch (error) {
            console.error('Error saving whiteboard:', error);
            setError('Error saving whiteboard. Please try again.');
        }
    };

    const loadWhiteboard = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/v1/whiteboard/getW/${groupId}`);
            console.log(response)
            const state = response.data.data
            console.log(state)
            if (state) {
                setLines(JSON.parse(state));
            }
        } catch (error) {
            console.error('Error loading whiteboard:', error);
            setError('Error loading whiteboard. Please refresh.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        try {
            setLoading(true);
            loadWhiteboard();
        } catch (error) {
            console.error("Server error:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleMouseDown = (e) => {
        setIsDrawing(true);
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { points: [pos.x, pos.y], stroke: brushColor, strokeWidth: brushRadius }]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines([...lines]);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        saveWhiteboard();
    };

    const handleClear = async () => {
        setLines([]);
        await saveWhiteboard();
    };

    const handleUndo = () => {
        const newLines = lines.slice(0, -1);
        setLines(newLines);
    };

    const exportToPDF = () => {
        const uri = stageRef.current.toDataURL();
        const pdf = new jsPDF();
        pdf.addImage(uri, 'PNG', 10, 10, 180, 160);
        pdf.save('whiteboard_drawing.pdf');
    };

    return (
        <div className="p-4">
            {loading ? (
                <div className='flex jsutify-center items-center'>
                    <Comment
                        visible={true}
                        height="80"
                        width="80"
                        color="yellow"
                        ariaLabel="comment-loading"
                    />
                </div>
            ) : (
                <div className="p-4">
                    <h2 className="text-2xl font-bold mb-4">Interactive Whiteboard</h2>
                    <div>
                        <Stage
                            ref={stageRef}
                            width={1400}
                            height={600}
                            onMouseDown={handleMouseDown}
                            onMousemove={handleMouseMove}
                            onMouseup={handleMouseUp}
                        >
                            <Layer>
                                {lines.map((line, i) => (
                                    <Line
                                        key={i}
                                        points={line.points}
                                        stroke={line.stroke}
                                        strokeWidth={line.strokeWidth}
                                        tension={0.5}
                                        lineCap="round"
                                        globalCompositeOperation={'source-over'}
                                    />
                                ))}
                            </Layer>
                        </Stage>
                    </div>

                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    <div className="mt-4 flex space-x-2">
                        <button
                            onClick={saveWhiteboard}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Save Whiteboard
                        </button>
                        <button
                            onClick={handleClear}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Clear Whiteboard
                        </button>
                        <button
                            onClick={handleUndo}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                            Undo
                        </button>
                        <div className="flex items-center">
                            <label htmlFor="brush-radius" className="mr-2">Brush Radius:</label>
                            <input
                                id="brush-radius"
                                type="number"
                                value={brushRadius}
                                onChange={(e) => setBrushRadius(Number(e.target.value))}
                                className="border rounded p-1 w-16"
                                min="1"
                            />
                        </div>
                        <select onChange={(e) => setBrushColor(e.target.value)}>
                            <option value="#ff0000">Red</option>
                            <option value="#008000">Green</option>
                            <option value="#FFFF00">Yellow</option>
                            <option value="#964B00">Brown</option>
                            <option value='#444'>Default</option>
                        </select>
                        <button onClick={exportToPDF} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
                            Export As PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Whiteboard;
