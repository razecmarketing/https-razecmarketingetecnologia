document.getElementById('contatoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;
    const textoWhatsapp = `Olá! Quero falar com o especialista em Tecnologia para fazer um orçamento! \nNome: ${nome} \nE-mail: ${email} \nMensagem: ${mensagem}`;
    window.open(`https://wa.me/551156784450?text=${encodeURIComponent(textoWhatsapp)}`, '_blank');
});

function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
}