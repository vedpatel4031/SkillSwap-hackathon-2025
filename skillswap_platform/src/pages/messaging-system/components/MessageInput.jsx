import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ onSendMessage, disabled = false, placeholder = "Type a message..." }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const commonEmojis = ['😊', '😂', '❤️', '👍', '👎', '😢', '😮', '😡', '🎉', '🔥', '💯', '👏'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage({
        type: 'text',
        content: message.trim(),
        timestamp: new Date().toISOString()
      });
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload
      const fileType = file.type.startsWith('image/') ? 'image' : 'file';
      onSendMessage({
        type: fileType,
        content: URL.createObjectURL(file),
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        timestamp: new Date().toISOString()
      });
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleVoiceRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Start voice recording logic here
      console.log('Starting voice recording...');
      
      // Simulate recording for demo
      setTimeout(() => {
        setIsRecording(false);
        onSendMessage({
          type: 'voice',
          content: 'voice-message-url',
          duration: '0:05',
          timestamp: new Date().toISOString()
        });
      }, 2000);
    } else {
      setIsRecording(false);
      // Stop recording logic here
      console.log('Stopping voice recording...');
    }
  };

  return (
    <div className="relative bg-card border-t border-border p-4">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-full left-4 right-4 mb-2 bg-popover border border-border rounded-lg shadow-elevated p-3 z-10">
          <div className="grid grid-cols-6 gap-2">
            {commonEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-xl p-2 hover:bg-muted rounded-md transition-smooth"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Voice Recording Indicator */}
      {isRecording && (
        <div className="absolute bottom-full left-4 right-4 mb-2 bg-primary text-primary-foreground rounded-lg p-3 flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Recording... Tap to stop</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        {/* Attachment Button */}
        <div className="flex-shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="p-2 text-muted-foreground hover:text-foreground transition-smooth disabled:opacity-50"
          >
            <Icon name="Paperclip" size={20} />
          </button>
        </div>

        {/* Message Input Container */}
        <div className="flex-1 relative">
          <div className="flex items-end bg-muted border border-border rounded-2xl overflow-hidden">
            {/* Text Input */}
            <textarea
              ref={textareaRef}
              value={message}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              rows={1}
              className="flex-1 px-4 py-3 bg-transparent border-none outline-none resize-none text-sm placeholder:text-muted-foreground disabled:opacity-50 max-h-[120px]"
              style={{ minHeight: '44px' }}
            />

            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              disabled={disabled}
              className="p-2 text-muted-foreground hover:text-foreground transition-smooth disabled:opacity-50"
            >
              <Icon name="Smile" size={20} />
            </button>
          </div>
        </div>

        {/* Send/Voice Button */}
        <div className="flex-shrink-0">
          {message.trim() ? (
            <Button
              type="submit"
              size="icon"
              disabled={disabled}
              className="h-11 w-11 rounded-full"
            >
              <Icon name="Send" size={20} />
            </Button>
          ) : (
            <button
              type="button"
              onClick={handleVoiceRecord}
              disabled={disabled}
              className={`h-11 w-11 rounded-full flex items-center justify-center transition-smooth disabled:opacity-50 ${
                isRecording 
                  ? 'bg-red-500 text-white' :'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              <Icon name={isRecording ? "Square" : "Mic"} size={20} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default MessageInput;