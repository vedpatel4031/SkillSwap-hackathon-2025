import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RequestCard = ({ request, onAccept, onDecline, onCancel, onMarkComplete, onMessage, onRate }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/10 border-warning/20';
      case 'active':
        return 'bg-success/10 border-success/20';
      case 'completed':
        return 'bg-muted border-border';
      case 'sent':
        return 'bg-primary/10 border-primary/20';
      default:
        return 'bg-card border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return 'Clock';
      case 'active':
        return 'CheckCircle';
      case 'completed':
        return 'Star';
      case 'sent':
        return 'Send';
      default:
        return 'Circle';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleAcceptWithMessage = () => {
    onAccept(request.id, message);
    setShowMessage(false);
    setMessage('');
  };

  const handleDeclineWithMessage = () => {
    onDecline(request.id, message);
    setShowMessage(false);
    setMessage('');
  };

  return (
    <div className={`rounded-lg border p-4 transition-smooth ${getStatusColor(request.status)}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Image
              src={request.partner.avatar}
              alt={request.partner.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${
              request.status === 'active' ? 'bg-success' : 'bg-muted'
            }`}>
              <Icon 
                name={getStatusIcon(request.status)} 
                size={10} 
                className="text-white"
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{request.partner.name}</h3>
            <p className="text-sm text-muted-foreground">{request.partner.location}</p>
            <p className="text-xs text-muted-foreground">{formatDate(request.createdAt)}</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-muted rounded transition-smooth"
        >
          <Icon 
            name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            className="text-muted-foreground"
          />
        </button>
      </div>

      {/* Exchange Details */}
      <div className="mb-4">
        <div className="flex items-center justify-between bg-muted/50 rounded-md p-3">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">They offer</p>
            <p className="font-medium text-foreground">{request.theirSkill}</p>
          </div>
          <div className="mx-3">
            <Icon name="ArrowLeftRight" size={16} className="text-muted-foreground" />
          </div>
          <div className="flex-1 text-right">
            <p className="text-xs text-muted-foreground mb-1">You offer</p>
            <p className="font-medium text-foreground">{request.yourSkill}</p>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mb-4 p-3 bg-muted/30 rounded-md">
          <h4 className="font-medium text-foreground mb-2">Exchange Details</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Duration: </span>
              <span className="text-foreground">{request.duration}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Preferred time: </span>
              <span className="text-foreground">{request.preferredTime}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Format: </span>
              <span className="text-foreground">{request.format}</span>
            </div>
            {request.message && (
              <div>
                <span className="text-muted-foreground">Message: </span>
                <p className="text-foreground mt-1">{request.message}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Message Input */}
      {showMessage && (
        <div className="mb-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Add a message (optional)"
            className="w-full p-3 border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            rows={3}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {request.status === 'pending' && request.type === 'received' && (
          <>
            {!showMessage ? (
              <>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  onClick={() => setShowMessage(true)}
                  className="flex-1"
                >
                  Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => onDecline(request.id)}
                  className="flex-1"
                >
                  Decline
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAcceptWithMessage}
                  className="flex-1"
                >
                  Confirm Accept
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeclineWithMessage}
                  className="flex-1"
                >
                  Confirm Decline
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMessage(false)}
                  className="w-auto"
                >
                  Cancel
                </Button>
              </>
            )}
          </>
        )}

        {request.status === 'active' && (
          <>
            <Button
              variant="default"
              size="sm"
              iconName="CheckCircle"
              iconPosition="left"
              onClick={() => onMarkComplete(request.id)}
              className="flex-1"
            >
              Mark Complete
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => onMessage(request.partner.id)}
              className="flex-1"
            >
              Message
            </Button>
          </>
        )}

        {request.status === 'completed' && !request.rated && (
          <Button
            variant="default"
            size="sm"
            iconName="Star"
            iconPosition="left"
            onClick={() => onRate(request.id)}
            className="flex-1"
          >
            Rate Experience
          </Button>
        )}

        {request.status === 'sent' && (
          <Button
            variant="destructive"
            size="sm"
            iconName="X"
            iconPosition="left"
            onClick={() => onCancel(request.id)}
            className="flex-1"
          >
            Cancel Request
          </Button>
        )}
      </div>
    </div>
  );
};

export default RequestCard;