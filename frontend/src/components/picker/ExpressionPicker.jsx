import { useState, useContext } from 'react';
import Picker from 'emoji-picker-react';
import { ThemeContext } from '../../context/ThemeContext';
import GifPicker from './GifPicker'; // Import our new GifPicker

const ExpressionPicker = ({ onEmojiClick, onGifSelect }) => {
    const [activeTab, setActiveTab] = useState('emoji');
    const { theme } = useContext(ThemeContext);

    return (
        <div className="w-[350px] h-[450px] flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
            <div className="flex-grow overflow-y-auto">
                {activeTab === 'emoji' && (
                    <div className='w-full h-full'>
                        <Picker 
                            onEmojiClick={onEmojiClick} 
                            theme={theme} 
                            width="100%" 
                            height="400px" 
                            searchDisabled={true}
                            previewConfig={{showPreview: false}}
                        />
                    </div>
                )}
                {activeTab === 'gif' && (
                    // Use the real GifPicker component here
                    <GifPicker onGifSelect={onGifSelect} />
                )}
            </div>

            <div className="flex border-t border-gray-200 dark:border-gray-700">
                <button 
                    onClick={() => setActiveTab('emoji')} 
                    className={`flex-1 p-2 text-sm font-medium ${activeTab === 'emoji' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                    Emoji
                </button>
                <button 
                    onClick={() => setActiveTab('gif')} 
                    className={`flex-1 p-2 text-sm font-medium ${activeTab === 'gif' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' : 'hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                >
                    GIF
                </button>
            </div>
        </div>
    );
};

export default ExpressionPicker;