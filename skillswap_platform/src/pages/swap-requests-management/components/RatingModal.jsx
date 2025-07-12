import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RatingModal = ({ isOpen, onClose, request, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen || !request) return null;

  const handleSubmit = () => {
    if (rating === 0) return;
    
    onSubmit({
      requestId: request.id,
      rating,
      feedback: feedback.trim(),
      partnerId: request.partner.id
    });
    
    // Reset form
    setRating(0);
    setFeedback('');
    onClose();
  };

  const handleClose = () => {
    setRating(0);
    setFeedback('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Rate Your Experience</h2>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-muted rounded transition-smooth"
          >
            <Icon name="X" size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Partner Info */}
          <div className="flex items-center space-x-3 mb-6">
            <img
              src={request.partner.avatar}
              alt={request.partner.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium text-foreground">{request.partner.name}</h3>
              <p className="text-sm text-muted-foreground">
                Taught you {request.theirSkill}
              </p>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              How was your experience?
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 transition-smooth"
                >
                  <Icon
                    name="Star"
                    size={32}
                    className={`${
                      star <= (hoveredRating || rating)
                        ? 'text-warning fill-current' :'text-muted-foreground'
                    } transition-smooth`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                {rating === 1 && 'Poor experience'}
                {rating === 2 && 'Below average'}
                {rating === 3 && 'Average experience'}
                {rating === 4 && 'Good experience'}
                {rating === 5 && 'Excellent experience'}
              </p>
            )}
          </div>

          {/* Feedback */}
          <div className="mb-6">
            <Input
              label="Feedback (Optional)"
              type="text"
              placeholder="Share your thoughts about this skill swap..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              description="Help others by sharing your experience"
            />
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={rating === 0}
              className="flex-1"
            >
              Submit Rating
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;