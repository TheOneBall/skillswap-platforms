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
        if (!this.currentSkill) return;
        
        alert(`🎉 Great! You've expressed interest in "${this.currentSkill.name}"!\n\nNext steps:\n• The mentor will contact you within 24 hours\n• Check your email for session details\n• Prepare any required materials`);
        
        console.log(`📊 User joined skill: ${this.currentSkill.name}`);
        this.closeModal();
    }
    
    handleContactMentor() {
        if (!this.currentSkill) return;
        
        const mentor = this.currentSkill.mentor;
        const subject = `Question about ${this.currentSkill.name}`;
        const body = `Hi ${mentor.name},\n\nI'm interested in your ${this.currentSkill.name} sessions and have a few questions...\n\nBest regards!`;
        
        const mailtoLink = `mailto:${mentor.contact}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink);
        
        console.log(`📧 Contact initiated for mentor: ${mentor.name}`);
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
