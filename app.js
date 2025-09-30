/**
 * HTML Canvas Avatar Generator
 * MIT License - No external dependencies
 * Supports 49+ million avatar combinations
 */

class AvatarGenerator {
    constructor() {
        this.canvas = document.getElementById('avatarCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isGenerating = false;
        
        // Avatar parts data
        this.avatarParts = {
            face_shapes: ["circle", "oval", "square", "heart", "diamond"],
            skin_tones: ["#fdbcb4", "#eaa485", "#d08b5b", "#ae7242", "#8d5524", "#754c24", "#613d24", "#4a2c2a"],
            hair_styles: ["bald", "short", "medium", "long", "curly", "straight", "wavy", "buzz-cut", "mohawk", "ponytail", "braids", "afro"],
            hair_colors: ["#2c1b18", "#8b4513", "#daa520", "#dc143c", "#a0522d", "#808080", "#f5f5f5", "#ff69b4"],
            eye_shapes: ["normal", "large", "small", "narrow", "round", "almond"],
            eye_colors: ["#654321", "#4169e1", "#228b22", "#8fbc8f", "#708090", "#ffbf00"],
            eyebrow_styles: ["thin", "normal", "thick", "bushy", "arched"],
            nose_shapes: ["small", "normal", "large", "wide"],
            mouth_shapes: ["small", "normal", "wide", "smile", "frown", "neutral"],
            facial_hair: ["none", "mustache", "beard", "goatee", "stubble", "full-beard"],
            accessories: ["none", "glasses", "sunglasses", "hat", "cap", "earrings", "necklace", "scarf"],
            clothing: ["shirt", "t-shirt", "sweater", "jacket", "dress", "hoodie"],
            backgrounds: ["#ffffff", "#e6f3ff", "#e6ffe6", "#ffe6f3", "#fff9e6", "#f0f0f0", "#1e3a8a", "#065f46", "#7c2d92", "gradient"]
        };

        // Default avatar configuration
        this.defaultAvatar = {
            face_shape: "oval",
            skin_tone: "#eaa485",
            hair_style: "medium",
            hair_color: "#8b4513",
            eye_shape: "normal",
            eye_color: "#654321",
            eyebrows: "normal",
            nose: "normal",
            mouth: "normal",
            facial_hair: "none",
            accessories: "none",
            clothing: "shirt",
            background: "#ffffff"
        };

        this.currentAvatar = { ...this.defaultAvatar };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.generateAvatar();
    }

    setupEventListeners() {
        // Control buttons
        document.getElementById('randomizeBtn').addEventListener('click', () => this.randomizeAvatar());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetAvatar());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadAvatar());

        // Customization controls
        const controls = [
            'faceShape', 'skinTone', 'hairStyle', 'hairColor', 'eyeShape', 'eyeColor',
            'eyebrows', 'nose', 'mouth', 'facialHair', 'accessories', 'clothing', 'background'
        ];

        controls.forEach(control => {
            const element = document.getElementById(control);
            if (element) {
                element.addEventListener('change', () => this.updateAvatarPart(control, element.value));
            }
        });

        // Keyboard navigation support
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    handleKeydown(e) {
        if (e.target.tagName === 'SELECT') return;
        
        switch(e.key) {
            case 'r':
            case 'R':
                if (e.ctrlKey || e.metaKey) return;
                e.preventDefault();
                this.randomizeAvatar();
                break;
            case 'Enter':
                if (e.target.classList.contains('btn')) {
                    e.target.click();
                }
                break;
        }
    }

    updateAvatarPart(part, value) {
        const partMap = {
            'faceShape': 'face_shape',
            'skinTone': 'skin_tone',
            'hairStyle': 'hair_style',
            'hairColor': 'hair_color',
            'eyeShape': 'eye_shape',
            'eyeColor': 'eye_color',
            'eyebrows': 'eyebrows',
            'nose': 'nose',
            'mouth': 'mouth',
            'facialHair': 'facial_hair',
            'accessories': 'accessories',
            'clothing': 'clothing',
            'background': 'background'
        };

        this.currentAvatar[partMap[part]] = value;
        this.generateAvatar();
    }

    randomizeAvatar() {
        this.currentAvatar = {
            face_shape: this.getRandomFromArray(this.avatarParts.face_shapes),
            skin_tone: this.getRandomFromArray(this.avatarParts.skin_tones),
            hair_style: this.getRandomFromArray(this.avatarParts.hair_styles),
            hair_color: this.getRandomFromArray(this.avatarParts.hair_colors),
            eye_shape: this.getRandomFromArray(this.avatarParts.eye_shapes),
            eye_color: this.getRandomFromArray(this.avatarParts.eye_colors),
            eyebrows: this.getRandomFromArray(this.avatarParts.eyebrow_styles),
            nose: this.getRandomFromArray(this.avatarParts.nose_shapes),
            mouth: this.getRandomFromArray(this.avatarParts.mouth_shapes),
            facial_hair: this.getRandomFromArray(this.avatarParts.facial_hair),
            accessories: this.getRandomFromArray(this.avatarParts.accessories),
            clothing: this.getRandomFromArray(this.avatarParts.clothing),
            background: this.getRandomFromArray(this.avatarParts.backgrounds)
        };

        this.updateControlsFromAvatar();
        this.generateAvatar();
    }

    resetAvatar() {
        this.currentAvatar = { ...this.defaultAvatar };
        this.updateControlsFromAvatar();
        this.generateAvatar();
    }

    updateControlsFromAvatar() {
        const controlMap = {
            'face_shape': 'faceShape',
            'skin_tone': 'skinTone',
            'hair_style': 'hairStyle',
            'hair_color': 'hairColor',
            'eye_shape': 'eyeShape',
            'eye_color': 'eyeColor',
            'eyebrows': 'eyebrows',
            'nose': 'nose',
            'mouth': 'mouth',
            'facial_hair': 'facialHair',
            'accessories': 'accessories',
            'clothing': 'clothing',
            'background': 'background'
        };

        Object.keys(controlMap).forEach(avatarKey => {
            const element = document.getElementById(controlMap[avatarKey]);
            if (element) {
                element.value = this.currentAvatar[avatarKey];
            }
        });
    }

    getRandomFromArray(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    async generateAvatar() {
        if (this.isGenerating) return;
        
        this.isGenerating = true;
        const container = document.querySelector('.canvas-container');
        container.classList.add('generating');

        try {
            await this.renderAvatar();
        } catch (error) {
            console.error('Error generating avatar:', error);
            this.showError('Failed to generate avatar');
        } finally {
            this.isGenerating = false;
            container.classList.remove('generating');
        }
    }

    async renderAvatar() {
        return new Promise((resolve) => {
            requestAnimationFrame(() => {
                const { width, height } = this.canvas;
                
                // Clear canvas
                this.ctx.clearRect(0, 0, width, height);
                
                // Set high quality rendering
                this.ctx.imageSmoothingEnabled = true;
                this.ctx.imageSmoothingQuality = 'high';

                // Draw avatar layers in order
                this.drawBackground(width, height);
                this.drawClothing(width / 2, height * 0.85, 120);
                this.drawFace(width / 2, height / 2, 80);
                this.drawHair(width / 2, height * 0.35, 85);
                this.drawEyebrows(width / 2, height * 0.42, 60);
                this.drawEyes(width / 2, height * 0.46, 50);
                this.drawNose(width / 2, height * 0.52, 25);
                this.drawMouth(width / 2, height * 0.6, 40);
                this.drawFacialHair(width / 2, height * 0.65, 70);
                this.drawAccessories(width / 2, height / 2, 100);

                resolve();
            });
        });
    }

    drawBackground(width, height) {
        if (this.currentAvatar.background === 'gradient') {
            const gradient = this.ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#ff6b6b');
            gradient.addColorStop(1, '#4ecdc4');
            this.ctx.fillStyle = gradient;
        } else {
            this.ctx.fillStyle = this.currentAvatar.background;
        }
        this.ctx.fillRect(0, 0, width, height);
    }

    drawFace(x, y, size) {
        const shape = this.currentAvatar.face_shape;
        this.ctx.fillStyle = this.currentAvatar.skin_tone;
        this.ctx.strokeStyle = this.darkenColor(this.currentAvatar.skin_tone, 20);
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        
        switch(shape) {
            case 'circle':
                this.ctx.arc(x, y, size, 0, Math.PI * 2);
                break;
            case 'oval':
                this.ctx.ellipse(x, y, size * 0.8, size, 0, 0, Math.PI * 2);
                break;
            case 'square':
                this.ctx.rect(x - size * 0.7, y - size * 0.8, size * 1.4, size * 1.6);
                break;
            case 'heart':
                this.drawHeart(x, y, size);
                break;
            case 'diamond':
                this.drawDiamond(x, y, size);
                break;
        }
        
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawHeart(x, y, size) {
        const width = size * 1.2;
        const height = size * 1.1;
        
        this.ctx.moveTo(x, y + height / 4);
        this.ctx.bezierCurveTo(x, y - height / 2, x - width / 2, y - height / 2, x - width / 2, y);
        this.ctx.bezierCurveTo(x - width / 2, y + height / 4, x, y + height / 2, x, y + height);
        this.ctx.bezierCurveTo(x, y + height / 2, x + width / 2, y + height / 4, x + width / 2, y);
        this.ctx.bezierCurveTo(x + width / 2, y - height / 2, x, y - height / 2, x, y + height / 4);
    }

    drawDiamond(x, y, size) {
        this.ctx.moveTo(x, y - size);
        this.ctx.lineTo(x + size * 0.7, y);
        this.ctx.lineTo(x, y + size);
        this.ctx.lineTo(x - size * 0.7, y);
        this.ctx.closePath();
    }

    drawHair(x, y, size) {
        if (this.currentAvatar.hair_style === 'bald') return;
        
        this.ctx.fillStyle = this.currentAvatar.hair_color;
        this.ctx.strokeStyle = this.darkenColor(this.currentAvatar.hair_color, 30);
        this.ctx.lineWidth = 1;

        this.ctx.beginPath();
        
        switch(this.currentAvatar.hair_style) {
            case 'short':
                this.ctx.ellipse(x, y, size * 0.9, size * 0.6, 0, 0, Math.PI * 2);
                break;
            case 'medium':
                this.ctx.ellipse(x, y, size, size * 0.8, 0, 0, Math.PI * 2);
                break;
            case 'long':
                this.ctx.ellipse(x, y + 20, size * 1.1, size * 1.2, 0, 0, Math.PI * 2);
                break;
            case 'curly':
                this.drawCurlyHair(x, y, size);
                break;
            case 'afro':
                this.ctx.ellipse(x, y, size * 1.3, size * 1.2, 0, 0, Math.PI * 2);
                break;
            case 'ponytail':
                this.ctx.ellipse(x, y, size * 0.8, size * 0.6, 0, 0, Math.PI * 2);
                this.ctx.ellipse(x + size * 0.8, y + 20, 15, 30, 0, 0, Math.PI * 2);
                break;
            case 'mohawk':
                this.ctx.rect(x - 15, y - 20, 30, size);
                break;
            default:
                this.ctx.ellipse(x, y, size * 0.9, size * 0.7, 0, 0, Math.PI * 2);
        }
        
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawCurlyHair(x, y, size) {
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const hairX = x + Math.cos(angle) * size * 0.7;
            const hairY = y + Math.sin(angle) * size * 0.5;
            this.ctx.ellipse(hairX, hairY, 12, 15, angle, 0, Math.PI * 2);
        }
    }

    drawEyes(x, y, size) {
        const eyeWidth = this.getEyeWidth(size);
        const eyeHeight = this.getEyeHeight(size);
        const eyeSpacing = size * 0.6;

        // Left eye
        this.drawSingleEye(x - eyeSpacing / 2, y, eyeWidth, eyeHeight);
        // Right eye
        this.drawSingleEye(x + eyeSpacing / 2, y, eyeWidth, eyeHeight);
    }

    drawSingleEye(x, y, width, height) {
        // Eye white
        this.ctx.fillStyle = '#ffffff';
        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 1;
        
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();

        // Iris
        this.ctx.fillStyle = this.currentAvatar.eye_color;
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, width * 0.6, height * 0.6, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Pupil
        this.ctx.fillStyle = '#000000';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, width * 0.3, height * 0.3, 0, 0, Math.PI * 2);
        this.ctx.fill();

        // Highlight
        this.ctx.fillStyle = '#ffffff';
        this.ctx.beginPath();
        this.ctx.ellipse(x - width * 0.15, y - height * 0.15, width * 0.1, height * 0.1, 0, 0, Math.PI * 2);
        this.ctx.fill();
    }

    getEyeWidth(baseSize) {
        const shape = this.currentAvatar.eye_shape;
        switch(shape) {
            case 'large': return baseSize * 0.5;
            case 'small': return baseSize * 0.25;
            case 'narrow': return baseSize * 0.2;
            case 'round': return baseSize * 0.4;
            default: return baseSize * 0.35;
        }
    }

    getEyeHeight(baseSize) {
        const shape = this.currentAvatar.eye_shape;
        switch(shape) {
            case 'large': return baseSize * 0.35;
            case 'small': return baseSize * 0.15;
            case 'narrow': return baseSize * 0.15;
            case 'round': return baseSize * 0.4;
            default: return baseSize * 0.25;
        }
    }

    drawEyebrows(x, y, size) {
        const eyebrowWidth = size * 0.8;
        const eyebrowHeight = this.getEyebrowHeight();
        const eyeSpacing = size * 0.6;

        this.ctx.fillStyle = this.darkenColor(this.currentAvatar.hair_color, 20);
        this.ctx.strokeStyle = this.darkenColor(this.currentAvatar.hair_color, 40);
        this.ctx.lineWidth = 1;

        // Left eyebrow
        this.drawSingleEyebrow(x - eyeSpacing / 2, y - size * 0.3, eyebrowWidth, eyebrowHeight);
        // Right eyebrow
        this.drawSingleEyebrow(x + eyeSpacing / 2, y - size * 0.3, eyebrowWidth, eyebrowHeight);
    }

    drawSingleEyebrow(x, y, width, height) {
        this.ctx.beginPath();
        
        switch(this.currentAvatar.eyebrows) {
            case 'thin':
                this.ctx.rect(x - width / 2, y, width, height * 0.5);
                break;
            case 'thick':
                this.ctx.rect(x - width / 2, y, width, height * 1.5);
                break;
            case 'bushy':
                this.ctx.ellipse(x, y + height / 2, width / 2, height, 0, 0, Math.PI * 2);
                break;
            case 'arched':
                this.ctx.ellipse(x, y + height / 2, width / 2, height * 0.7, 0, 0, Math.PI);
                break;
            default:
                this.ctx.rect(x - width / 2, y, width, height);
        }
        
        this.ctx.fill();
        this.ctx.stroke();
    }

    getEyebrowHeight() {
        switch(this.currentAvatar.eyebrows) {
            case 'thin': return 3;
            case 'thick': return 8;
            case 'bushy': return 10;
            default: return 5;
        }
    }

    drawNose(x, y, size) {
        this.ctx.fillStyle = this.darkenColor(this.currentAvatar.skin_tone, 10);
        this.ctx.strokeStyle = this.darkenColor(this.currentAvatar.skin_tone, 30);
        this.ctx.lineWidth = 1;

        const noseWidth = this.getNoseWidth(size);
        const noseHeight = this.getNoseHeight(size);

        this.ctx.beginPath();
        
        switch(this.currentAvatar.nose) {
            case 'small':
                this.ctx.ellipse(x, y, noseWidth * 0.6, noseHeight * 0.8, 0, 0, Math.PI * 2);
                break;
            case 'large':
                this.ctx.ellipse(x, y, noseWidth * 1.3, noseHeight * 1.2, 0, 0, Math.PI * 2);
                break;
            case 'wide':
                this.ctx.ellipse(x, y, noseWidth * 1.5, noseHeight, 0, 0, Math.PI * 2);
                break;
            default:
                this.ctx.ellipse(x, y, noseWidth, noseHeight, 0, 0, Math.PI * 2);
        }
        
        this.ctx.fill();
        this.ctx.stroke();
    }

    getNoseWidth(baseSize) {
        return baseSize * 0.4;
    }

    getNoseHeight(baseSize) {
        return baseSize * 0.6;
    }

    drawMouth(x, y, size) {
        this.ctx.fillStyle = '#ff6b9d';
        this.ctx.strokeStyle = '#d63384';
        this.ctx.lineWidth = 2;

        const mouthWidth = this.getMouthWidth(size);
        const mouthHeight = size * 0.3;

        this.ctx.beginPath();
        
        switch(this.currentAvatar.mouth) {
            case 'small':
                this.ctx.ellipse(x, y, mouthWidth * 0.6, mouthHeight * 0.6, 0, 0, Math.PI);
                break;
            case 'wide':
                this.ctx.ellipse(x, y, mouthWidth * 1.4, mouthHeight, 0, 0, Math.PI);
                break;
            case 'smile':
                this.ctx.arc(x, y - mouthHeight * 0.5, mouthWidth, 0, Math.PI);
                break;
            case 'frown':
                this.ctx.arc(x, y + mouthHeight * 0.5, mouthWidth, Math.PI, Math.PI * 2);
                break;
            case 'neutral':
                this.ctx.rect(x - mouthWidth / 2, y, mouthWidth, 2);
                break;
            default:
                this.ctx.ellipse(x, y, mouthWidth, mouthHeight, 0, 0, Math.PI);
        }
        
        this.ctx.fill();
        this.ctx.stroke();
    }

    getMouthWidth(baseSize) {
        switch(this.currentAvatar.mouth) {
            case 'small': return baseSize * 0.4;
            case 'wide': return baseSize * 0.8;
            default: return baseSize * 0.6;
        }
    }

    drawFacialHair(x, y, size) {
        if (this.currentAvatar.facial_hair === 'none') return;

        this.ctx.fillStyle = this.darkenColor(this.currentAvatar.hair_color, 20);
        this.ctx.strokeStyle = this.darkenColor(this.currentAvatar.hair_color, 40);
        this.ctx.lineWidth = 1;

        this.ctx.beginPath();
        
        switch(this.currentAvatar.facial_hair) {
            case 'mustache':
                this.ctx.ellipse(x, y - size * 0.2, size * 0.6, size * 0.15, 0, 0, Math.PI * 2);
                break;
            case 'beard':
                this.ctx.ellipse(x, y + size * 0.3, size * 0.8, size * 0.5, 0, 0, Math.PI * 2);
                break;
            case 'goatee':
                this.ctx.ellipse(x, y + size * 0.2, size * 0.4, size * 0.3, 0, 0, Math.PI * 2);
                break;
            case 'stubble':
                this.drawStubble(x, y, size);
                break;
            case 'full-beard':
                this.ctx.ellipse(x, y - size * 0.2, size * 0.6, size * 0.15, 0, 0, Math.PI * 2); // mustache
                this.ctx.ellipse(x, y + size * 0.3, size * 0.9, size * 0.6, 0, 0, Math.PI * 2); // beard
                break;
        }
        
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawStubble(x, y, size) {
        this.ctx.fillStyle = this.darkenColor(this.currentAvatar.hair_color, 30);
        for (let i = 0; i < 20; i++) {
            const stubbleX = x + (Math.random() - 0.5) * size;
            const stubbleY = y + (Math.random() - 0.5) * size * 0.6;
            this.ctx.fillRect(stubbleX, stubbleY, 1, 1);
        }
    }

    drawAccessories(x, y, size) {
        if (this.currentAvatar.accessories === 'none') return;

        this.ctx.strokeStyle = '#000000';
        this.ctx.lineWidth = 2;

        switch(this.currentAvatar.accessories) {
            case 'glasses':
                this.drawGlasses(x, y - size * 0.1, size * 0.8);
                break;
            case 'sunglasses':
                this.drawSunglasses(x, y - size * 0.1, size * 0.8);
                break;
            case 'hat':
                this.drawHat(x, y - size * 0.8, size);
                break;
            case 'cap':
                this.drawCap(x, y - size * 0.8, size);
                break;
            case 'earrings':
                this.drawEarrings(x, y, size);
                break;
            case 'necklace':
                this.drawNecklace(x, y + size * 0.8, size);
                break;
            case 'scarf':
                this.drawScarf(x, y + size * 0.6, size);
                break;
        }
    }

    drawGlasses(x, y, size) {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        
        // Left lens
        this.ctx.beginPath();
        this.ctx.ellipse(x - size * 0.3, y, size * 0.25, size * 0.2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Right lens
        this.ctx.beginPath();
        this.ctx.ellipse(x + size * 0.3, y, size * 0.25, size * 0.2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Bridge
        this.ctx.beginPath();
        this.ctx.moveTo(x - size * 0.05, y);
        this.ctx.lineTo(x + size * 0.05, y);
        this.ctx.stroke();
    }

    drawSunglasses(x, y, size) {
        this.ctx.fillStyle = '#000000';
        
        // Left lens
        this.ctx.beginPath();
        this.ctx.ellipse(x - size * 0.3, y, size * 0.25, size * 0.2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Right lens
        this.ctx.beginPath();
        this.ctx.ellipse(x + size * 0.3, y, size * 0.25, size * 0.2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Bridge
        this.ctx.beginPath();
        this.ctx.moveTo(x - size * 0.05, y);
        this.ctx.lineTo(x + size * 0.05, y);
        this.ctx.stroke();
    }

    drawHat(x, y, size) {
        this.ctx.fillStyle = '#8b4513';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, size, size * 0.3, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawCap(x, y, size) {
        this.ctx.fillStyle = '#4169e1';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, size * 0.8, size * 0.5, 0, 0, Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Visor
        this.ctx.beginPath();
        this.ctx.ellipse(x, y + size * 0.2, size * 0.6, size * 0.2, 0, 0, Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawEarrings(x, y, size) {
        this.ctx.fillStyle = '#ffd700';
        
        // Left earring
        this.ctx.beginPath();
        this.ctx.arc(x - size * 0.8, y, 5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Right earring
        this.ctx.beginPath();
        this.ctx.arc(x + size * 0.8, y, 5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawNecklace(x, y, size) {
        this.ctx.fillStyle = '#ffd700';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, size * 0.8, size * 0.1, 0, 0, Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Pendant
        this.ctx.beginPath();
        this.ctx.arc(x, y + size * 0.1, 8, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawScarf(x, y, size) {
        this.ctx.fillStyle = '#dc143c';
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, size, size * 0.15, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawClothing(x, y, size) {
        this.ctx.fillStyle = this.getClothingColor();
        this.ctx.strokeStyle = this.darkenColor(this.getClothingColor(), 30);
        this.ctx.lineWidth = 2;

        this.ctx.beginPath();
        
        switch(this.currentAvatar.clothing) {
            case 'shirt':
                this.ctx.rect(x - size / 2, y - size / 4, size, size / 2);
                break;
            case 't-shirt':
                this.ctx.rect(x - size / 2, y - size / 4, size, size / 2);
                // T-shirt sleeves
                this.ctx.rect(x - size * 0.7, y - size / 4, size * 0.2, size / 3);
                this.ctx.rect(x + size * 0.5, y - size / 4, size * 0.2, size / 3);
                break;
            case 'sweater':
                this.ctx.rect(x - size * 0.6, y - size / 3, size * 1.2, size / 2);
                break;
            case 'jacket':
                this.ctx.rect(x - size * 0.6, y - size / 3, size * 1.2, size / 2);
                // Collar
                this.ctx.moveTo(x - size * 0.2, y - size / 3);
                this.ctx.lineTo(x, y - size / 2);
                this.ctx.lineTo(x + size * 0.2, y - size / 3);
                break;
            case 'dress':
                this.ctx.ellipse(x, y, size * 0.8, size * 0.6, 0, 0, Math.PI * 2);
                break;
            case 'hoodie':
                this.ctx.rect(x - size * 0.6, y - size / 3, size * 1.2, size / 2);
                // Hood
                this.ctx.arc(x, y - size / 2, size * 0.4, 0, Math.PI);
                break;
        }
        
        this.ctx.fill();
        this.ctx.stroke();
    }

    getClothingColor() {
        const colors = ['#4169e1', '#dc143c', '#228b22', '#ff8c00', '#8a2be2', '#20b2aa'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    darkenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    downloadAvatar() {
        try {
            const link = document.getElementById('downloadLink');
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const filename = `avatar-${timestamp}.png`;
            
            link.download = filename;
            link.href = this.canvas.toDataURL('image/png');
            link.click();
            
            this.showSuccess('Avatar downloaded successfully!');
        } catch (error) {
            console.error('Download failed:', error);
            this.showError('Failed to download avatar');
        }
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.error-message, .success-message');
        existingMessages.forEach(msg => msg.remove());

        const messageElement = document.createElement('div');
        messageElement.className = `${type}-message`;
        messageElement.textContent = message;
        
        const container = document.querySelector('.canvas-controls');
        container.appendChild(messageElement);

        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    }
}

// Initialize the avatar generator when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AvatarGenerator();
});

// MIT License
/*
MIT License

Copyright (c) 2025 Avatar Generator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/