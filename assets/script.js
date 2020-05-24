const selectAll = query => Array.from(document.querySelectorAll(query))

function setSections(sections, holder) {
    const routes = []
    sections.forEach(s => {
        holder.appendChild(
            createThumb(s)
        )
        routes.push(s.getAttribute('data-slug'))
    })

    const spacer = document.createElement('div')
    spacer.classList.add('Spacer')
    holder.appendChild(spacer)

    return routes
}

function createThumb(section) {
    const title = section.getAttribute('data-title')
    const div = document.createElement('div')
    div.setAttribute('data-link', section.getAttribute('data-slug'))
    div.classList.add('thumb')
    div.innerHTML = `<span>${title}</span>`
    div.style.backgroundImage = `url(${section.getAttribute('data-image')})`

    div.addEventListener('click', function() {
        setSelected(this)
        section.scrollIntoView({behavior: 'smooth'})
    })
    
    return div
}

function setSelected(selected) {
    selectAll('.thumb').forEach(t => t.classList.remove('active'))
    selected.classList.add('active')
    location.hash = selected.getAttribute('data-link')
}

window.addEventListener('load', function(){
    const sections = selectAll('#main section')
    const thumbHolder = document.querySelector('#thumbnails .Thumbnails')

    const scrollButtons = selectAll('.Scroll-icon');

    scrollButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            const link = e.target.getAttribute('data-link-to')
            const post = document.querySelector(`[data-link="${link}"]`)
            post.scrollIntoView({behavior: 'smooth'})
        })
    })
    
    const routes = setSections(sections, thumbHolder)

    const theHash = location.hash.substr(1);

    if(routes.includes(theHash)) {
        document.querySelector(`[data-link="${theHash}"]`).click()
    } else {
        document.querySelector('.thumb').click()
    }
})
