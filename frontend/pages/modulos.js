export function verificarLogin() {
    const token = localStorage.getItem('token')

    if (!token) {
        alert('Faça o log-in para acessar o perfil')
        window.location.href = './login.html'
    }
}

export function senhaToggle() {
    const showHide = event.currentTarget
    const senhaFill = document.getElementById("senhaFill")

    showHide.classList.toggle("fa-eye-slash")
    const tipo = senhaFill.getAttribute("type") === "password" ? "text" : "password"
    senhaFill.setAttribute("type", tipo)
}