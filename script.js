// Simple JavaScript for SkillSwap landing page

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 SkillSwap platform loaded successfully!');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Button click handlers
    const ctaButtons = document.querySelectorAll('.cta-btn, .btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            alert(`🚧 "${buttonText}" feature coming soon! This is a demo project showcasing GitHub skills.`);
        });
    });
    
    // Add some interactivity to skill items
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('click', function() {
            const skillName = this.querySelector('h4').textContent;
            alert(`🎯 Interested in ${skillName}? Join our community to connect with teachers!`);
        });
    });
    
    // Simple animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('.step, .skill-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Display random skill suggestion
    const skills = [
        'Guitar Playing', 'Web Development', 'Cooking', 'Photography', 
        'Language Exchange', 'Yoga', 'Painting', 'Public Speaking'
    ];
    
    function showRandomSkill() {
        const randomSkill = skills[Math.floor(Math.random() * skills.length)];
        console.log(`💡 Suggested skill to learn today: ${randomSkill}`);
    }
    
    // Show random skill suggestion every 10 seconds
    setInterval(showRandomSkill, 10000);
    showRandomSkill(); // Show one immediately
});

// Add some fun console messages
console.log('🌟 Welcome to SkillSwap!');
console.log('👨‍💻 This project demonstrates GitHub skills:');
console.log('   ✅ Repository creation');
console.log('   ✅ Commit messages');
console.log('   ✅ Branch management');
console.log('   ✅ Pull requests');
console.log('   ✅ GitHub Pages hosting');
console.log('🚀 Check the Network tab in GitHub to see the workflow!');
