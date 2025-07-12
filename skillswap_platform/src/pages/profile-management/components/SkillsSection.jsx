import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SkillsSection = ({ title, skills, onSkillsUpdate, placeholder, icon }) => {
  const [newSkill, setNewSkill] = useState('');
  const [suggestions] = useState([
    'JavaScript', 'Python', 'React', 'Node.js', 'Design', 'Photography',
    'Marketing', 'Writing', 'Teaching', 'Cooking', 'Music', 'Languages',
    'Data Analysis', 'Project Management', 'Public Speaking', 'Graphic Design'
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter(
    suggestion => 
      suggestion.toLowerCase().includes(newSkill.toLowerCase()) &&
      !skills.some(skill => skill.name.toLowerCase() === suggestion.toLowerCase())
  );

  const handleAddSkill = (skillName = newSkill) => {
    if (skillName.trim() && !skills.some(skill => skill.name.toLowerCase() === skillName.toLowerCase())) {
      const newSkillObj = {
        id: Date.now(),
        name: skillName.trim(),
        level: 'Intermediate',
        experience: '1-2 years'
      };
      onSkillsUpdate([...skills, newSkillObj]);
      setNewSkill('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveSkill = (skillId) => {
    onSkillsUpdate(skills.filter(skill => skill.id !== skillId));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-subtle">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name={icon} size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      </div>

      {/* Add New Skill */}
      <div className="relative mb-4">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder={placeholder}
              value={newSkill}
              onChange={(e) => {
                setNewSkill(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowSuggestions(newSkill.length > 0)}
              className="w-full"
            />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-popover border border-border rounded-md shadow-elevated z-10 mt-1 max-h-40 overflow-y-auto">
                {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleAddSkill(suggestion)}
                    className="w-full text-left px-3 py-2 hover:bg-muted transition-smooth text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button onClick={() => handleAddSkill()} disabled={!newSkill.trim()}>
            <Icon name="Plus" size={16} />
          </Button>
        </div>
      </div>

      {/* Skills List */}
      <div className="space-y-3">
        {skills.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="Plus" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No skills added yet</p>
            <p className="text-sm">Add your first skill above</p>
          </div>
        ) : (
          skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center justify-between p-3 bg-muted rounded-md group hover:bg-muted/80 transition-smooth"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-foreground">{skill.name}</span>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    {skill.level}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{skill.experience}</p>
              </div>
              
              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="sm">
                  <Icon name="Edit2" size={14} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleRemoveSkill(skill.id)}
                >
                  <Icon name="Trash2" size={14} className="text-destructive" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SkillsSection;