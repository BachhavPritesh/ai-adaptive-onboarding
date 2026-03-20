const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const moduleProgressSchema = new mongoose.Schema({
  moduleId: { type: String, required: true },
  title: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started'
  },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  completedAt: { type: Date },
  startedAt: { type: Date }
});

const learningSessionSchema = new mongoose.Schema({
  moduleId: { type: String, required: true },
  startedAt: { type: Date, default: Date.now },
  lastActiveAt: { type: Date, default: Date.now },
  timeSpent: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  stats: {
    nodesCompleted: { type: Number, default: 0 },
    synthesisRate: { type: Number, default: 0 },
    activePaths: { type: Number, default: 0 }
  },
  moduleProgress: [moduleProgressSchema],
  learningSessions: [learningSessionSchema],
  currentRoadmap: {
    resumeSummary: String,
    skills: [{
      name: String,
      level: String,
      category: String
    }],
    skillGaps: [{
      name: String,
      currentLevel: String,
      requiredLevel: String,
      priority: String,
      reason: String
    }],
    roadmap: [{
      id: String,
      title: String,
      description: String,
      reasoning: String,
      duration: String
    }]
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function() {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.calculateCompletionPercentage = function() {
  if (!this.currentRoadmap?.roadmap || this.currentRoadmap.roadmap.length === 0) {
    return 0;
  }
  
  const completedModules = this.moduleProgress.filter(m => m.status === 'completed').length;
  return Math.round((completedModules / this.currentRoadmap.roadmap.length) * 100);
};

userSchema.methods.getModuleProgress = function(moduleId) {
  return this.moduleProgress.find(m => m.moduleId === moduleId);
};

module.exports = mongoose.model('User', userSchema);
