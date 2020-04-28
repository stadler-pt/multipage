const navToggler = document.querySelector(".nav-toggle")
const navLinks = document.querySelectorAll(".nav-item")

const plusses = document.querySelectorAll(".plus")

navToggler.addEventListener("click", () => {
    document.body.classList.toggle("nav-open")
})

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        document.body.classList.remove("nav-open")
    })
})

window.addEventListener("resize", () => {
    if (window.innerWidth > 660) {
        document.body.classList.remove("nav-open")
    }
})

plusses.forEach(plus => {
    plus.addEventListener("click", x => {
        console.log(x.target)
        
        const container = x.target.parentNode
        const img = container.querySelector(".directorImg")
        const title = container.querySelector(".directorTitle")
        const text = container.querySelector(".directorText")
        const name = container.querySelector(".directorName")
        if (window.getComputedStyle(img).getPropertyValue("opacity") == '1') {
            img.style.opacity = '0'
            title.style.opacity = '0'
            text.style.opacity = '1'
            name.style.transform = 'translateY(-90px)'
            x.target.style.transform = 'rotateZ(45deg) translateX(-50%)'
            x.target.style.backgroundColor = '#79C8C7'
        }
        else {
            img.style.opacity = '1'
            title.style.opacity = '1'
            text.style.opacity = '0'
            name.style.transform = 'translateY(0)'
            x.target.style.transform = 'rotateZ(0) translateX(-50%)'
            x.target.style.backgroundColor = '#F67E7E'
        }
    })
})

const svgs = document.querySelectorAll('svg')
svgs.forEach(x => {
    x.style.fill = 'white'
    x.addEventListener('mouseover', () => {
        x.style.fill = '#F67E7E'
    })
    x.addEventListener('mouseleave', () => {
        x.style.fill = 'white'
    })
})


const check = e => {
    if(e.value === '') {
        e.style.borderColor = '#F67E7E'
        e.nextElementSibling.style.display = 'block'
    } else {
        e.style.borderColor = 'rgb(121, 200, 199, 0.8)'
        e.nextElementSibling.style.display = 'none'
    }
}