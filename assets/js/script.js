const previousButton = document.querySelector('.arrow.left')
const nextButton = document.querySelector('.arrow.right')
const body = document.querySelector('body')
const navLinks = document.querySelector('.links')
const menuBurger = document.querySelector('.menu-burger')
const slider = document.querySelector('.slider')
const allIndicators = document.querySelectorAll('.indicator')

menuBurger.addEventListener('click', () => {
    body.classList.toggle('active')
    navLinks.classList.toggle('active')
    menuBurger.classList.toggle('active')
})

if (slider) {
    const sliderItems = slider.querySelectorAll('.slider-item')

    let index = 0
    const sliderLenght = sliderItems.length

    const touchData = {
        carouselWidth: slider.offsetWidth, // Largeur du carrousel
        startTouchX: 0, // Position du doigt sur l’axe horizontal quand il commence à toucher l’écran
        lastDeltaX: 0, // Dernier mouvement connu du doigt sur l’axe horizontal
    }

    const setUi = () => {
        slider.style.transform = `translateX(-${
            index * sliderItems[0].offsetWidth
        }px)`
        allIndicators.forEach((indicator) => {
            indicator.classList.remove('active')
        })
        allIndicators[index].classList.add('active')

        if (index === 0) previousButton.style.display = 'none'
        else previousButton.style.display = 'block'

        if (index === sliderLenght - 1) nextButton.style.display = 'none'
        else nextButton.style.display = 'block'
    }

    nextButton.addEventListener('click', () => {
        if (index < sliderLenght - 1) index++
        setUi()
    })

    previousButton.addEventListener('click', () => {
        if (index > 0) index--
        setUi()
    })

    slider.addEventListener('touchstart', (e) => {
        touchData.startTouchX = e.touches[0].screenX
        touchData.carouselWidth = slider.offsetWidth
        slider.style.transition = 'none'
    })

    slider.addEventListener('touchmove', (e) => {
        const deltaX = e.touches[0].screenX - touchData.startTouchX
        if (
            (index === 0 && deltaX > 0) ||
            (index === sliderLenght - 1 && deltaX < 0)
        )
            return
        touchData.lastDeltaX = deltaX
        const basePercentTranslate = index * -100
        const percentTranslate =
            basePercentTranslate + (100 * deltaX) / touchData.carouselWidth
        slider.style.transform = `translate(${percentTranslate}%)`
    })

    slider.addEventListener('touchend', (e) => {
        if (Math.abs(touchData.lastDeltaX / touchData.carouselWidth) > 0.1) {
            if (index !== 0 && touchData.lastDeltaX > 0) index--

            if (index !== sliderLenght - 1 && touchData.lastDeltaX < 0) index++
        }
        // Annuler le style injecté précédement par le JS
        slider.style.transition = ''
        // Afficher la bonne diapositive en fonction de l’index
        setUi()
    })

    allIndicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            index = i
            setUi()
        })
    })

    setUi()
}
