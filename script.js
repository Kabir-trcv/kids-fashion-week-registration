// Multi-Step Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    
    // Step elements
    const formSteps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step-indicator .step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    let currentStep = 1;
    const totalSteps = formSteps.length;

    // Initialize first step
    showStep(currentStep);

    // City selection handling
    const citySelect = document.getElementById('city');
    const otherCityGroup = document.getElementById('otherCityGroup');
    const otherCityInput = document.getElementById('otherCity');

    citySelect.addEventListener('change', function() {
        if (this.value === 'Other') {
            otherCityGroup.style.display = 'block';
            otherCityInput.required = true;
        } else {
            otherCityGroup.style.display = 'none';
            otherCityInput.required = false;
            otherCityInput.value = '';
        }
    });

    // Navigation button handlers
    nextBtn.addEventListener('click', function() {
        if (validateStep(currentStep)) {
            currentStep++;
            showStep(currentStep);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    prevBtn.addEventListener('click', function() {
        currentStep--;
        showStep(currentStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Show specific step
    function showStep(step) {
        // Hide all steps
        formSteps.forEach((formStep) => {
            formStep.classList.remove('active');
        });

        // Show current step
        formSteps[step - 1].classList.add('active');

        // Update step indicators
        updateStepIndicators(step);

        // Update navigation buttons
        updateNavigationButtons(step);

        // Update current step variable
        currentStep = step;
    }

    // Update step indicators
    function updateStepIndicators(step) {
        stepIndicators.forEach((indicator, index) => {
            const stepNumber = index + 1;
            
            // Remove all classes
            indicator.classList.remove('active', 'completed');
            
            // Add appropriate class
            if (stepNumber < step) {
                indicator.classList.add('completed');
            } else if (stepNumber === step) {
                indicator.classList.add('active');
            }
        });
    }

    // Update navigation buttons
    function updateNavigationButtons(step) {
        // Previous button
        if (step === 1) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-flex';
        }

        // Next and Submit buttons
        if (step === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    }

    // Validate current step
    function validateStep(step) {
        const currentFormStep = formSteps[step - 1];
        const inputs = currentFormStep.querySelectorAll('input[required], select[required], textarea[required]');
        
        let isValid = true;
        let firstInvalidField = null;

        inputs.forEach(input => {
            // Skip if input is hidden (like otherCity when not needed)
            if (input.offsetParent === null && input.type !== 'checkbox') {
                return;
            }

            if (input.type === 'checkbox') {
                if (!input.checked) {
                    isValid = false;
                    if (!firstInvalidField) firstInvalidField = input;
                    input.parentElement.style.animation = 'shake 0.5s';
                    setTimeout(() => {
                        input.parentElement.style.animation = '';
                    }, 500);
                }
            } else if (input.type === 'file') {
                if (!input.files || input.files.length === 0) {
                    isValid = false;
                    if (!firstInvalidField) firstInvalidField = input;
                    showError(input, 'This field is required');
                }
            } else {
                if (!input.value.trim()) {
                    isValid = false;
                    if (!firstInvalidField) firstInvalidField = input;
                    input.style.borderColor = 'var(--error-color)';
                    showError(input, 'This field is required');
                } else {
                    input.style.borderColor = '';
                    hideError(input);
                }
            }
        });

        // Additional validation for specific steps
        if (step === 1) {
            // City validation
            if (!citySelect.value) {
                isValid = false;
                alert('Please select your city');
                return false;
            }
            if (citySelect.value === 'Other' && !otherCityInput.value.trim()) {
                isValid = false;
                alert('Please specify your city');
                return false;
            }
        }

        if (step === 2) {
            // Child information validation
            const age = parseInt(document.getElementById('age').value);
            if (age < 3 || age > 16) {
                isValid = false;
                alert('Age must be between 3 and 16 years!');
                return false;
            }
        }

        if (step === 4) {
            // Photo validation
            const photosInput = document.getElementById('photos');
            if (!photosInput.files || photosInput.files.length !== 3) {
                isValid = false;
                alert('Please upload exactly 3 photos (Left, Right, Front)!');
                return false;
            }

            // Video validation
            const introVideo = document.getElementById('introVideo');
            if (!introVideo.files || introVideo.files.length === 0) {
                isValid = false;
                alert('Please upload a 30-second introduction video!');
                return false;
            }
        }

        if (step === 5) {
            // Terms validation
            const termsAgree = document.getElementById('termsAgree');
            const photoConsent = document.getElementById('photoConsent');
            
            if (!termsAgree.checked) {
                isValid = false;
                alert('Please agree to the Terms & Conditions!');
                return false;
            }

            if (!photoConsent.checked) {
                isValid = false;
                alert('Please provide consent for photography and videography!');
                return false;
            }
        }

        if (!isValid && firstInvalidField) {
            firstInvalidField.focus();
        }

        return isValid;
    }

    // Show error message
    function showError(input, message) {
        let errorElement = input.parentElement.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.style.color = 'var(--error-color)';
            errorElement.style.fontSize = '13px';
            errorElement.style.marginTop = '5px';
            input.parentElement.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    // Hide error message
    function hideError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    // File upload preview functionality for 3 photos
    const photosInput = document.getElementById('photos');
    const photosPreview = document.getElementById('photosPreview');
    
    photosInput.addEventListener('change', function(e) {
        handlePhotosPreview(e.target.files);
    });

    function handlePhotosPreview(files) {
        // Check if exactly 3 files are selected
        if (files.length !== 3) {
            alert('Please select exactly 3 photos (Left, Right, Front)');
            photosInput.value = '';
            return;
        }

        // Check file sizes (5MB max per file)
        const maxSize = 5 * 1024 * 1024; // 5MB
        for (let file of files) {
            if (file.size > maxSize) {
                alert('Each photo must be less than 5MB!');
                photosInput.value = '';
                return;
            }
            if (!file.type.startsWith('image/')) {
                alert('Please upload only image files!');
                photosInput.value = '';
                return;
            }
        }

        // Display the 3 photos in the slots
        const photoSlots = photosPreview.querySelectorAll('.photo-slot');
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            const slot = photoSlots[i];
            
            reader.onload = function(e) {
                // Remove existing image if any
                const existingImg = slot.querySelector('img');
                if (existingImg) {
                    existingImg.remove();
                }
                
                // Create and add new image
                const img = document.createElement('img');
                img.src = e.target.result;
                slot.appendChild(img);
                slot.classList.add('filled');
            };
            
            reader.readAsDataURL(file);
        }
    }

    // Video upload preview functionality
    const introVideo = document.getElementById('introVideo');
    const videoPreview = document.getElementById('videoPreview');
    
    introVideo.addEventListener('change', function(e) {
        handleVideoPreview(e.target.files[0]);
    });

    function handleVideoPreview(file) {
        if (!file) return;

        // Check file type
        if (!file.type.startsWith('video/')) {
            alert('Please upload a valid video file!');
            introVideo.value = '';
            return;
        }

        // Check file size (50MB max)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
            alert('Video file must be less than 50MB!');
            introVideo.value = '';
            return;
        }

        // Create video preview
        const reader = new FileReader();
        reader.onload = function(e) {
            videoPreview.innerHTML = '';
            
            const video = document.createElement('video');
            video.src = e.target.result;
            video.controls = true;
            video.style.width = '100%';
            
            // Check video duration
            video.addEventListener('loadedmetadata', function() {
                const duration = Math.round(video.duration);
                
                if (duration > 35) { // Allow 5 seconds buffer
                    alert(`Video is ${duration} seconds long. Please upload a video of maximum 30 seconds.`);
                    introVideo.value = '';
                    videoPreview.innerHTML = '';
                    return;
                }
                
                // Show video info
                const videoInfo = document.createElement('div');
                videoInfo.className = 'video-info';
                videoInfo.innerHTML = `
                    <div class="video-info-item">
                        <strong>Duration:</strong> <span>${duration} seconds</span>
                    </div>
                    <div class="video-info-item">
                        <strong>Size:</strong> <span>${(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                    </div>
                    <div class="video-info-item">
                        <strong>✓</strong> <span style="color: var(--success-color);">Video Uploaded</span>
                    </div>
                `;
                
                videoPreview.appendChild(video);
                videoPreview.appendChild(videoInfo);
                videoPreview.classList.add('show');
            });
        };
        
        reader.readAsDataURL(file);
    }

    // Auto-calculate age from date of birth
    const dateOfBirth = document.getElementById('dateOfBirth');
    const ageInput = document.getElementById('age');

    dateOfBirth.addEventListener('change', function() {
        const dob = new Date(this.value);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        
        if (age >= 0 && age <= 16) {
            ageInput.value = age;
        }
    });

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    });

    // Form submission with validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateStep(currentStep)) {
            submitFormData();
        }
    });

    // Function to submit form data to server
    async function submitFormData() {
        try {
            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="btn-text">Submitting...</span> ⏳';

            // Prepare FormData
            const formData = new FormData(form);
            
            // Send to server
            const response = await fetch('/api/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Store registration ID
                localStorage.setItem('lastRegistrationId', result.registrationId);
                
                // Show success message
                showSuccessMessage(result.registrationId);
            } else {
                throw new Error(result.error || 'Submission failed');
            }

        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit registration. Please try again.\n\nError: ' + error.message);
            
            // Reset button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-text">Submit Registration</span><span class="btn-icon">🎉</span>';
        }
    }

    function showSuccessMessage(registrationId) {
        // Add smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update success message with registration ID
        if (registrationId) {
            const successMessageElement = document.getElementById('successMessage');
            const registrationIdElement = document.createElement('div');
            registrationIdElement.style.marginTop = '20px';
            registrationIdElement.style.padding = '15px';
            registrationIdElement.style.background = 'rgba(255, 255, 255, 0.9)';
            registrationIdElement.style.borderRadius = '10px';
            registrationIdElement.style.fontSize = '16px';
            registrationIdElement.innerHTML = `
                <strong>Your Registration ID:</strong><br>
                <span style="font-size: 20px; color: var(--primary-color); font-weight: bold;">${registrationId}</span><br>
                <small style="color: var(--text-light);">Please save this ID for future reference</small>
            `;
            
            // Insert after the paragraph
            const paragraph = successMessageElement.querySelector('p');
            paragraph.after(registrationIdElement);
        }
        
        // Hide form and show success message
        setTimeout(() => {
            form.style.display = 'none';
            document.querySelector('.step-indicator').style.display = 'none';
            successMessage.classList.add('show');
            
            // Create confetti effect
            createConfetti();
        }, 300);
    }

    // Confetti animation
    function createConfetti() {
        const colors = ['#ff6b9d', '#c44569', '#ffa502', '#4834d4', '#686de0', '#30336b'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.opacity = '0.8';
                
                document.body.appendChild(confetti);

                const fallDuration = 3000 + Math.random() * 2000;
                const fallDistance = window.innerHeight + 50;
                const swayDistance = (Math.random() - 0.5) * 200;

                confetti.animate([
                    {
                        transform: 'translateY(0) translateX(0) rotate(0deg)',
                        opacity: 0.8
                    },
                    {
                        transform: `translateY(${fallDistance}px) translateX(${swayDistance}px) rotate(${Math.random() * 720}deg)`,
                        opacity: 0
                    }
                ], {
                    duration: fallDuration,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });

                setTimeout(() => {
                    confetti.remove();
                }, fallDuration);
            }, i * 50);
        }
    }

    // Add smooth scroll for form sections
    const formSections = document.querySelectorAll('.form-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    formSections.forEach(section => {
        observer.observe(section);
    });

    // Add input animation on focus
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Clear error on input
        input.addEventListener('input', function() {
            this.style.borderColor = '';
            hideError(this);
        });
    });

    // Drag and drop for file upload
    const fileUploadLabels = document.querySelectorAll('.file-upload-label');
    
    fileUploadLabels.forEach(label => {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            label.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            label.addEventListener(eventName, () => {
                label.style.borderColor = '#ff6b9d';
                label.style.background = '#ffebf3';
                label.style.transform = 'scale(1.02)';
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            label.addEventListener(eventName, () => {
                label.style.borderColor = '#ddd';
                label.style.background = '#fafafa';
                label.style.transform = 'scale(1)';
            });
        });

        label.addEventListener('drop', function(e) {
            const fileInput = this.previousElementSibling;
            fileInput.files = e.dataTransfer.files;
            
            // Trigger change event
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
        });
    });

    // Add character counter for textareas
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = 500;
        textarea.setAttribute('maxlength', maxLength);
        
        const counter = document.createElement('div');
        counter.style.fontSize = '12px';
        counter.style.color = '#636e72';
        counter.style.textAlign = 'right';
        counter.style.marginTop = '5px';
        counter.textContent = `0 / ${maxLength}`;
        
        textarea.parentElement.appendChild(counter);
        
        textarea.addEventListener('input', function() {
            const length = this.value.length;
            counter.textContent = `${length} / ${maxLength}`;
            
            if (length > maxLength * 0.9) {
                counter.style.color = '#d63031';
            } else {
                counter.style.color = '#636e72';
            }
        });
    });

    // Social media input auto-formatting
    const instagramInput = document.getElementById('instagram');

    if (instagramInput) {
        instagramInput.addEventListener('input', function(e) {
            let value = e.target.value;
            // Auto-add @ if not present
            if (value && !value.startsWith('@')) {
                e.target.value = '@' + value;
            }
        });
    }

    // Video background error handling
    const bgVideo = document.getElementById('bgVideo');
    if (bgVideo) {
        bgVideo.addEventListener('error', function() {
            console.log('Video failed to load, using fallback overlay');
            const videoOverlay = document.querySelector('.video-overlay');
            if (videoOverlay) {
                videoOverlay.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)';
            }
        });

        // Ensure video plays on mobile
        bgVideo.play().catch(function(error) {
            console.log('Video autoplay prevented:', error);
        });
    }

    // Logo error handling
    const companyLogo = document.getElementById('companyLogo');
    if (companyLogo) {
        companyLogo.addEventListener('error', function() {
            console.log('Logo failed to load');
            this.style.display = 'none';
        });
    }

    // Animate social media icons on input
    const socialInputs = document.querySelectorAll('.social-input-wrapper input');
    socialInputs.forEach(input => {
        input.addEventListener('focus', function() {
            const icon = this.parentElement.querySelector('.social-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });

        input.addEventListener('blur', function() {
            const icon = this.parentElement.querySelector('.social-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Add shake animation for validation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
    `;
    document.head.appendChild(style);

    // Console log for form data (for debugging)
    console.log('Kids Junior Fashion Week Multi-Step Registration Form Loaded');
    console.log(`Total Steps: ${totalSteps}`);
    console.log('Form validation and animations active');
});
