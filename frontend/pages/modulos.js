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

const indexIMG = []
for (let i = 1; i <= 5; i++) {
    indexIMG.push(`./assets/images/index-img-${i}.jpg`)
}

indexIMG.forEach(src => {
    const img = new Image()
    img.src = src
})

export function indexBG() {
    const fundo = document.getElementById('fundo')
    
    let atual = 0;
    fundo.style.backgroundImage = `url('${indexIMG[atual]}')`

    setInterval(() => {
        atual = (atual + 1) % indexIMG.length;
        fundo.style.backgroundImage = `url('${indexIMG[atual]}')`
    }, 8000)
}
