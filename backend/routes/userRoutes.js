const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Get User Profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        stats: {
          nodesCompleted: user.moduleProgress?.filter(m => m.status === 'completed').length || 0,
          synthesisRate: user.calculateCompletionPercentage() + '%',
          activePaths: user.moduleProgress?.filter(m => m.status === 'in-progress').length || 0
        },
        currentRoadmap: user.currentRoadmap
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching profile'
    });
  }
});

// Update User Profile
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findById(req.user._id);
    
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    
    await user.save();
    
    res.json({
      success: true,
      message: "Profile updated successfully",
      data: { name: user.name, avatar: user.avatar }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
});

// Get User Settings
router.get('/settings', protect, async (req, res) => {
  try {
    const user = req.user;
    res.json({
      success: true,
      data: {
        notifications: user.settings?.notifications ?? true,
        darkMode: user.settings?.darkMode ?? true,
        privacyLevel: user.settings?.privacyLevel ?? 'High'
      }
    });
  } catch (error) {
    console.error('Settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching settings'
    });
  }
});

// Update User Settings
router.put('/settings', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.settings = { ...user.settings, ...req.body };
    await user.save();
    
    res.json({
      success: true,
      message: "Settings updated successfully",
      data: user.settings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating settings'
    });
  }
});

// Save roadmap data
router.post('/roadmap', protect, async (req, res) => {
  try {
    const { resumeSummary, skills, skillGaps, roadmap } = req.body;
    const user = await User.findById(req.user._id);
    
    user.currentRoadmap = {
      resumeSummary,
      skills,
      skillGaps,
      roadmap: roadmap.map((item, index) => ({
        id: item.id || `module-${index}`,
        title: item.title,
        description: item.description,
        reasoning: item.reasoning,
        duration: item.duration
      }))
    };
    
    await user.save();
    
    res.json({
      success: true,
      message: "Roadmap saved successfully"
    });
  } catch (error) {
    console.error('Save roadmap error:', error);
    res.status(500).json({
      success: false,
      message: 'Error saving roadmap'
    });
  }
});

// Get progress for all modules
router.get('/progress', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      success: true,
      data: {
        moduleProgress: user.moduleProgress || [],
        completionPercentage: user.calculateCompletionPercentage(),
        totalModules: user.currentRoadmap?.roadmap?.length || 0,
        completedModules: user.moduleProgress?.filter(m => m.status === 'completed').length || 0,
        currentRoadmap: user.currentRoadmap
      }
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching progress'
    });
  }
});

// Update module progress
router.post('/progress/:moduleId', protect, async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { status, progress, title } = req.body;
    const user = await User.findById(req.user._id);
    
    const existingProgress = user.moduleProgress.find(m => m.moduleId === moduleId);
    
    if (existingProgress) {
      if (status) existingProgress.status = status;
      if (progress !== undefined) existingProgress.progress = progress;
      if (status === 'completed') {
        existingProgress.completedAt = new Date();
      }
    } else {
      user.moduleProgress.push({
        moduleId,
        title: title || moduleId,
        status: status || 'in-progress',
        progress: progress || 0,
        startedAt: new Date(),
        completedAt: status === 'completed' ? new Date() : null
      });
    }
    
    user.stats = user.stats || {};
    user.stats.nodesCompleted = user.moduleProgress.filter(m => m.status === 'completed').length;
    
    await user.save();
    
    res.json({
      success: true,
      message: "Progress updated successfully",
      data: {
        completionPercentage: user.calculateCompletionPercentage(),
        completedModules: user.stats.nodesCompleted
      }
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating progress'
    });
  }
});

// Start a module
router.post('/module/start/:moduleId', protect, async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { title } = req.body;
    const user = await User.findById(req.user._id);
    
    const existingProgress = user.moduleProgress.find(m => m.moduleId === moduleId);
    
    if (existingProgress) {
      if (existingProgress.status === 'completed') {
        return res.json({
          success: true,
          message: "Module already completed",
          data: existingProgress
        });
      }
      existingProgress.status = 'in-progress';
      existingProgress.startedAt = new Date();
    } else {
      user.moduleProgress.push({
        moduleId,
        title: title || moduleId,
        status: 'in-progress',
        progress: 0,
        startedAt: new Date()
      });
    }
    
    await user.save();
    
    res.json({
      success: true,
      message: "Module started successfully",
      data: user.calculateCompletionPercentage()
    });
  } catch (error) {
    console.error('Start module error:', error);
    res.status(500).json({
      success: false,
      message: 'Error starting module'
    });
  }
});

// Complete a module
router.post('/module/complete/:moduleId', protect, async (req, res) => {
  try {
    const { moduleId } = req.params;
    const user = await User.findById(req.user._id);
    
    const existingProgress = user.moduleProgress.find(m => m.moduleId === moduleId);
    
    if (existingProgress) {
      existingProgress.status = 'completed';
      existingProgress.progress = 100;
      existingProgress.completedAt = new Date();
    } else {
      user.moduleProgress.push({
        moduleId,
        title: moduleId,
        status: 'completed',
        progress: 100,
        startedAt: new Date(),
        completedAt: new Date()
      });
    }
    
    user.stats = user.stats || {};
    user.stats.nodesCompleted = user.moduleProgress.filter(m => m.status === 'completed').length;
    
    await user.save();
    
    res.json({
      success: true,
      message: "Module completed!",
      data: {
        completionPercentage: user.calculateCompletionPercentage(),
        completedModules: user.stats.nodesCompleted,
        totalModules: user.currentRoadmap?.roadmap?.length || 0
      }
    });
  } catch (error) {
    console.error('Complete module error:', error);
    res.status(500).json({
      success: false,
      message: 'Error completing module'
    });
  }
});

module.exports = router;
