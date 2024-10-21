import React, { useState, useEffect, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { useParams } from 'react-router-dom';
import { jsPDF } from "jspdf"
import axios from 'axios';

const Whiteboard = () => {
    const [whiteboardState, setWhiteboardState] = useState(null);
    const canvasRef = useRef(null);
    const [brushRadius, setBrushRadius] = useState(10)
    const [brushColor, setBrushColor] = useState("#444")
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { groupId } = useParams()
    
    // Function to save the current whiteboard state
    const saveWhiteboard = async () => {
        const dataURL = canvasRef.current.getSaveData(); // Save canvas data
        
        try {
            await axios.post(`http://localhost:8000/api/v1/whiteboard/saveW/${groupId}`, 
                { 
                    whiteboardState: dataURL 
                }
            );
            alert('Whiteboard saved successfully!');
        } catch (error) {
            console.error('Error saving whiteboard:', error);
            setError('Error saving whiteboard. Please try again.');
        }
    };

    // Function to load the whiteboard state
    const loadWhiteboard = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/whiteboard/getW/${groupId}`);
            const state = response.data.data;
       
            if (state) {
                setWhiteboardState(state);
            }
        } catch (error) {
            console.error('Error loading whiteboard:', error);
            setError('Error loading whiteboard. Please refresh.');
        } finally {
            setLoading(false); // Set loading to false after API call
        }
    };

    useEffect(() => {
        loadWhiteboard(); // Load the previous state when the component is mounted
    }, []);

    const handleClear = async() => {
        canvasRef.current.clear(); // Clear the canvas
        // setWhiteboardState(null); // Clear the stored state
        await saveWhiteboard()
    };

    const handleErase = () => {
        canvasRef.current.eraseAll()
        setWhiteboardState(whiteboardState)
    }

    const handleUndo = () => {
        canvasRef.current.undo()
    }

    const exportToPDF = () => {
        const canvas = canvasRef.current.canvas.drawing
        const imgData = canvas.toDataURL("image/png")

        const pdf = new jsPDF()
        pdf.addImage(imgData, 'PNG', 10, 10, 180, 160)
        pdf.save("whiteboard_drawing.pdf")
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Interactive Whiteboard</h2>
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : (
                <CanvasDraw
                    ref={canvasRef}
                    canvasWidth={1400}
                    canvasHeight={600}
                    saveData={whiteboardState}
                    className="border border-gray-400"
                    brushRadius={brushRadius}
                    brushColor={brushColor}
                />
            )}
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
                    onClick={handleErase}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Erase
                </button>
                <button onClick={handleUndo} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA9jcySNxfqU2VgijC8lIWt51tt0z9um3YIA&s' className='h-[2vw] w-[2vw] rounded-xl' />
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
    );
};

export default Whiteboard;
