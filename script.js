// script.js - إطار إدارة استمرارية الأعمال
// سكريبت جافاسكريبت للموقع الإلكتروني لإطار إدارة استمرارية الأعمال

document.addEventListener('DOMContentLoaded', function() {
    // تفعيل التنقل المتجاوب للأجهزة المحمولة
    const nav = document.querySelector('nav');
    const navToggle = document.createElement('button');
    navToggle.classList.add('nav-toggle');
    navToggle.innerHTML = '<span></span><span></span><span></span>';
    navToggle.setAttribute('aria-label', 'تبديل القائمة');
    
    nav.querySelector('.container').prepend(navToggle);
    
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
    });
    
    // إضافة سلوك التمرير السلس للروابط
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // تحسين تجربة المستخدم للجداول على الأجهزة المحمولة
    const tables = document.querySelectorAll('table');
    tables.forEach(table => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('table-responsive');
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
    
    // إضافة زر العودة إلى الأعلى
    const backToTopButton = document.createElement('button');
    backToTopButton.classList.add('back-to-top');
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'العودة إلى الأعلى');
    document.body.appendChild(backToTopButton);
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // إظهار/إخفاء زر العودة إلى الأعلى بناءً على موضع التمرير
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // إضافة تأثيرات التحويم للعناصر التفاعلية
    const interactiveElements = document.querySelectorAll('.feature-item, .appendix-item, .btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // تحسين إمكانية الوصول
    // إضافة سمات ARIA للعناصر التفاعلية
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (!button.hasAttribute('aria-label')) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });
    
    // تحسين التنقل باستخدام لوحة المفاتيح
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('focus', function() {
            nav.classList.add('nav-open');
        });
    });
    
    // إضافة دعم وضع الطباعة
    const printButton = document.createElement('button');
    printButton.classList.add('print-button');
    printButton.innerHTML = '<i class="fas fa-print"></i> طباعة';
    printButton.setAttribute('aria-label', 'طباعة الصفحة');
    
    const mainContent = document.querySelector('main .container');
    if (mainContent) {
        mainContent.prepend(printButton);
    }
    
    printButton.addEventListener('click', function() {
        window.print();
    });
});

// إضافة تنسيقات CSS إضافية لدعم التنقل المتجاوب
document.head.insertAdjacentHTML('beforeend', `
<style>
    .nav-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 10px;
    }
    
    .nav-toggle span {
        display: block;
        width: 25px;
        height: 3px;
        margin: 5px 0;
        background-color: var(--primary-color);
        transition: transform 0.3s ease;
    }
    
    .table-responsive {
        overflow-x: auto;
        margin-bottom: 1.5rem;
    }
    
    .back-to-top {
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease, visibility 0.3s ease;
        z-index: 1000;
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
    }
    
    .print-button {
        background-color: var(--secondary-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: var(--border-radius);
        cursor: pointer;
        margin-bottom: 1rem;
        display: inline-block;
    }
    
    @media (max-width: 768px) {
        .nav-toggle {
            display: block;
            position: absolute;
            top: 10px;
            right: 15px;
        }
        
        nav ul {
            display: none;
            flex-direction: column;
            width: 100%;
        }
        
        nav.nav-open ul {
            display: flex;
        }
        
        nav.nav-open .nav-toggle span:first-child {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        nav.nav-open .nav-toggle span:nth-child(2) {
            opacity: 0;
        }
        
        nav.nav-open .nav-toggle span:last-child {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }
</style>
`);
