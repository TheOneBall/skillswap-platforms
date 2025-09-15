/**
 * SkillSwap - Interactive Skill Modal System
 * Handles dynamic skill loading and modal interactions
 */

class SkillModalSystem {
    constructor() {
        this.skills = [];
        this.modal = null;
        this.currentSkill = null;
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadSkills();
            this.setupModal();
            this.renderSkills();
            this.bindEvents();
            
            console.log('🎯 SkillSwap Modal System initialized successfully!');
        } catch (error) {
            console.error('❌ Failed to initialize skill system:', error);
            this.showFallbackSkills();
        }
    }
    
    async loadSkills() {
        try {
            const response = await fetch('./data/skills.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.skills = data.skills;
            console.log(`📚 Loaded ${this.skills.length} skills`);
        } catch (error) {
            console.error('Failed to load skills data:', error);
            throw error;
        }
    }
    
    setupModal() {
        this.modal = document.getElementById('skill-modal');
        if (!this.modal) {
            console.error('Modal element not found!');
            return;
        }
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Close button
        const closeBtn = this.modal.querySelector('.close-button');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        // Escape key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });
    }
    
    renderSkills() {
        const skillsGrid = document.getElementById('skills-grid');
        if (!skillsGrid) {
            console.error('Skills grid element not found!');
            return;
        }
        
        // Clear existing content
        skillsGrid.innerHTML = '';
        
        this.skills.forEach(skill => {
            const skillElement = this.createSkillElement(skill);
            skillsGrid.appendChild(skillElement);
        });
        
        console.log(`✅ Rendered ${this.skills.length} skill cards`);
    }
    
    createSkillElement(skill) {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill-item interactive';
        skillDiv.setAttribute('data-skill-id', skill.id);
        
        skillDiv.innerHTML = `
            <i class="${skill.icon}"></i>
            <h4>${skill.name}</h4>
            <span>${skill.frequency}</span>
            <div class="skill-preview">
                <small>👥 Max ${skill.maxStrength} • ${skill.difficulty}</small>
            </div>
        `;
        
        // Add click event
        skillDiv.addEventListener('click', () => {
            this.openModal(skill);
        });
        
        // Add hover effects
        skillDiv.addEventListener('mouseenter', () => {
            skillDiv.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        skillDiv.addEventListener('mouseleave', () => {
            skillDiv.style.transform = 'translateY(0) scale(1)';
        });
        
        return skillDiv;
    }
    
    openModal(skill) {
        this.currentSkill = skill;
        this.populateModal(skill);
        
        // Show modal with animation
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        console.log(`📖 Opened modal for: ${skill.name}`);
    }
    
    populateModal(skill) {
        // Header information
        const modalIcon = document.getElementById('modal-icon');
        const modalTitle = document.getElementById('modal-title');
        
        if (modalIcon) modalIcon.className = skill.icon + ' skill-icon';
        if (modalTitle) modalTitle.textContent = skill.name;
        
        // Mentor information
        const mentorAvatar = document.getElementById('mentor-avatar');
        const mentorName = document.getElementById('mentor-name');
        const mentorContact = document.getElementById('mentor-contact');
        
        if (mentorAvatar) {
            mentorAvatar.src = skill.mentor.avatar;
            mentorAvatar.alt = `${skill.mentor.name} - Mentor`;
        }
        if (mentorName) mentorName.textContent = skill.mentor.name;
        if (mentorContact) mentorContact.textContent = skill.mentor.contact;
        
        // Skill details
        const timingElement = document.getElementById('skill-timing');
        const strengthElement = document.getElementById('skill-strength');
        const requirementsElement = document.getElementById('skill-requirements');
        const frequencyElement = document.getElementById('skill-frequency');
        const descriptionElement = document.getElementById('skill-description');
        
        if (timingElement) timingElement.textContent = skill.timing;
        if (strengthElement) strengthElement.textContent = `${skill.maxStrength} participants`;
        if (requirementsElement) requirementsElement.textContent = skill.whoCanJoin;
        if (frequencyElement) frequencyElement.textContent = skill.frequency;
        if (descriptionElement) descriptionElement.textContent = skill.description;
        
        // Meta information
        const categoryElement = document.getElementById('skill-category');
        const difficultyElement = document.getElementById('skill-difficulty');
        const durationElement = document.getElementById('skill-duration');
        
        if (categoryElement) categoryElement.textContent = skill.category;
        if (difficultyElement) difficultyElement.textContent = skill.difficulty;
        if (durationElement) durationElement.textContent = skill.duration;
    }
    
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        this.currentSkill = null;
        
        console.log('❌ Modal closed');
    }
    
    bindEvents() {
        // Join skill button
        const joinBtn = document.getElementById('join-skill-btn');
        if (joinBtn) {
            joinBtn.addEventListener('click', () => {
                this.handleJoinSkill();
            });
        }
        
        // Contact mentor button
        const contactBtn = document.getElementById('contact-mentor-btn');
        if (contactBtn) {
            contactBtn.addEventListener('click', () => {
                this.handleContactMentor();
            });
        }
    }
    
    handleJoinSkill() {
    if (!this.currentSkill) {
        this.showError('No skill selected. Please try again.');
        return;
    }
    
    // Create interest collection form
    this.showInterestForm();
}

handleContactMentor() {
    if (!this.currentSkill) {
        this.showError('No skill selected. Please try again.');
        return;
    }
    
    const mentor = this.currentSkill.mentor;
    const skill = this.currentSkill;
    
    // Enhanced email template
    const subject = `Inquiry about ${skill.name} sessions`;
    const body = `Hi ${mentor.name},

I'm interested in joining your ${skill.name} sessions and would like to know more details.

Skill Details I'm Interested In:
• ${skill.name} - ${skill.difficulty}
• Timing: ${skill.timing}
• Duration: ${skill.duration}
• Frequency: ${skill.frequency}

Questions:
1. Are there any prerequisites I should know about?
2. What materials or equipment do I need to bring?
3. How do I sign up for the sessions?

Looking forward to hearing from you!

Best regards,
[Your Name]

---
This message was sent through SkillSwap Platform
Mentor: ${mentor.name} | Skill: ${skill.name}`;

    try {
        const mailtoLink = `mailto:${mentor.contact}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Try to open email client
        window.open(mailtoLink, '_blank');
        
        // Show success feedback
        this.showSuccess(`📧 Opening email to ${mentor.name}...`, 'If your email client didn\'t open, you can manually send to: ' + mentor.contact);
        
        // Track the contact attempt
        this.trackContactAttempt(mentor, skill);
        
        console.log(`📧 Email opened for mentor: ${mentor.name}`);
        
    } catch (error) {
        console.error('Error opening email client:', error);
        this.showError(`Could not open email client. Please manually contact: ${mentor.contact}`);
    }
}

showInterestForm() {
    // Create the interest form modal
    const formHTML = `
        <div class="interest-form-overlay">
            <div class="interest-form">
                <div class="form-header">
                    <h3>Express Interest in ${this.currentSkill.name}</h3>
                    <span class="form-close" onclick="skillModalSystem.closeInterestForm()">&times;</span>
                </div>
                <div class="form-body">
                    <p>Great choice! Please provide your details so ${this.currentSkill.mentor.name} can contact you about joining the ${this.currentSkill.name} sessions.</p>
                    
                    <form id="interest-form">
                        <div class="form-group">
                            <label for="user-name">Your Full Name *</label>
                            <input type="text" id="user-name" name="name" required placeholder="Enter your full name">
                        </div>
                        
                        <div class="form-group">
                            <label for="user-email">Your Email Address *</label>
                            <input type="email" id="user-email" name="email" required placeholder="your.email@example.com">
                        </div>
                        
                        <div class="form-group">
                            <label for="user-phone">Phone Number (Optional)</label>
                            <input type="tel" id="user-phone" name="phone" placeholder="+1 (555) 123-4567">
                        </div>
                        
                        <div class="form-group">
                            <label for="user-experience">Your Experience Level</label>
                            <select id="user-experience" name="experience">
                                <option value="complete-beginner">Complete Beginner</option>
                                <option value="some-experience">Some Experience</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="user-message">Additional Message (Optional)</label>
                            <textarea id="user-message" name="message" rows="3" placeholder="Any questions or specific interests you'd like to mention..."></textarea>
                        </div>
                        
                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="skillModalSystem.closeInterestForm()">Cancel</button>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-paper-plane"></i>
                                Submit Interest
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add form to page
    document.body.insertAdjacentHTML('beforeend', formHTML);
    
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    
    // Bind form submission
    const form = document.getElementById('interest-form');
    form.addEventListener('submit', (e) => this.submitInterest(e));
    
    // Focus first input
    setTimeout(() => {
        document.getElementById('user-name').focus();
    }, 100);
}

submitInterest(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const userData = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        phone: formData.get('phone').trim(),
        experience: formData.get('experience'),
        message: formData.get('message').trim(),
        skillId: this.currentSkill.id,
        skillName: this.currentSkill.name,
        mentorName: this.currentSkill.mentor.name,
        mentorEmail: this.currentSkill.mentor.contact,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    // Validate required fields
    if (!userData.name || !userData.email) {
        this.showError('Please fill in all required fields (Name and Email).');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
        this.showError('Please enter a valid email address.');
        return;
    }
    
    try {
        // Store the interest
        this.storeUserInterest(userData);
        
        // Show success message
        this.showInterestSuccess(userData);
        
        // Close form and modal
        this.closeInterestForm();
        this.closeModal();
        
        console.log('✅ Interest submitted:', userData);
        
    } catch (error) {
        console.error('Error submitting interest:', error);
        this.showError('There was an error submitting your interest. Please try again.');
    }
}

storeUserInterest(userData) {
    try {
        // Get existing interests from localStorage
        let interests = JSON.parse(localStorage.getItem('skillswap-interests') || '[]');
        
        // Check if user already expressed interest in this skill
        const existingInterest = interests.find(interest => 
            interest.email === userData.email && interest.skillId === userData.skillId
        );
        
        if (existingInterest) {
            // Update existing interest
            Object.assign(existingInterest, userData);
            existingInterest.updatedAt = new Date().toISOString();
        } else {
            // Add new interest
            userData.id = Date.now().toString();
            interests.push(userData);
        }
        
        // Save back to localStorage
        localStorage.setItem('skillswap-interests', JSON.stringify(interests));
        
        // Also create a summary for easy viewing
        this.updateInterestsSummary();
        
        return userData;
        
    } catch (error) {
        console.error('Storage error:', error);
        throw new Error('Failed to save your interest');
    }
}

updateInterestsSummary() {
    try {
        const interests = JSON.parse(localStorage.getItem('skillswap-interests') || '[]');
        const summary = {};
        
        interests.forEach(interest => {
            if (!summary[interest.skillId]) {
                summary[interest.skillId] = {
                    skillName: interest.skillName,
                    mentorName: interest.mentorName,
                    interests: []
                };
            }
            summary[interest.skillId].interests.push({
                name: interest.name,
                email: interest.email,
                experience: interest.experience,
                timestamp: interest.timestamp
            });
        });
        
        localStorage.setItem('skillswap-interests-summary', JSON.stringify(summary));
        
    } catch (error) {
        console.error('Error updating summary:', error);
    }
}

trackContactAttempt(mentor, skill) {
    try {
        let contacts = JSON.parse(localStorage.getItem('skillswap-contacts') || '[]');
        
        const contactRecord = {
            id: Date.now().toString(),
            skillId: skill.id,
            skillName: skill.name,
            mentorName: mentor.name,
            mentorEmail: mentor.contact,
            timestamp: new Date().toISOString()
        };
        
        contacts.push(contactRecord);
        localStorage.setItem('skillswap-contacts', JSON.stringify(contacts));
        
    } catch (error) {
        console.error('Error tracking contact:', error);
    }
}

closeInterestForm() {
    const form = document.querySelector('.interest-form-overlay');
    if (form) {
        form.remove();
    }
    document.body.style.overflow = ''; // Restore scrolling
}

showInterestSuccess(userData) {
    const successMessage = `
        <div class="success-notification">
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <h3>Interest Submitted Successfully! 🎉</h3>
                <p><strong>${userData.name}</strong>, your interest in <strong>${userData.skillName}</strong> has been recorded.</p>
                
                <div class="next-steps">
                    <h4>What happens next:</h4>
                    <ul>
                        <li>✅ ${userData.mentorName} will receive your details</li>
                        <li>📧 You'll be contacted at ${userData.email} within 24-48 hours</li>
                        <li>📅 You'll receive session schedule and joining instructions</li>
                        <li>🎯 You can contact the mentor directly if needed</li>
                    </ul>
                </div>
                
                <div class="notification-actions">
                    <button class="btn btn-primary" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Got it!
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', successMessage);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        const notification = document.querySelector('.success-notification');
        if (notification) notification.remove();
    }, 10000);
}

showSuccess(title, message = '') {
    this.showNotification('success', title, message);
}

showError(message) {
    this.showNotification('error', 'Error', message);
}

showNotification(type, title, message) {
    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle';
    const bgColor = type === 'success' ? '#10b981' : '#ef4444';
    
    const notification = document.createElement('div');
    notification.className = `toast-notification ${type}`;
    notification.innerHTML = `
        <div class="toast-content">
            <i class="fas ${iconClass}"></i>
            <div class="toast-text">
                <strong>${title}</strong>
                ${message ? `<p>${message}</p>` : ''}
            </div>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

    
    showFallbackSkills() {
        const fallbackSkills = [
            { id: 'programming', name: 'Programming', icon: 'fas fa-laptop-code', frequency: '3 times/week' },
            { id: 'languages', name: 'Languages', icon: 'fas fa-language', frequency: '2 times/week' },
            { id: 'music', name: 'Music', icon: 'fas fa-music', frequency: '2 times/week' }
        ];
        
        const skillsGrid = document.getElementById('skills-grid');
        if (skillsGrid) {
            skillsGrid.innerHTML = fallbackSkills.map(skill => `
                <div class="skill-item">
                    <i class="${skill.icon}"></i>
                    <h4>${skill.name}</h4>
                    <span>${skill.frequency}</span>
                </div>
            `).join('');
        }
        
        console.log('⚠️ Showing fallback skills due to loading error');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.skillModalSystem = new SkillModalSystem();
});
