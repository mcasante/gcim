const selectAll = query => Array.from(document.querySelectorAll(query))


function changeVhVar() {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

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

    const bgImage = section.getAttribute('data-image')
    if(bgImage) div.style.backgroundImage = `url(${bgImage})`

    div.addEventListener('click', function() {
        setSelected(this)
        section.scrollIntoView()
    })
    
    return div
}

function setSelected(selected) {
    selectAll('.thumb').forEach(t => t.classList.remove('active'))
    selected.classList.add('active')
    location.hash = selected.getAttribute('data-link')
}

window.addEventListener('load', function(){

    changeVhVar()
    
    const sections = selectAll('#main section')
    const thumbHolder = document.querySelector('#thumbnails .Thumbnails')

    const scrollButtons = selectAll('.Scroll-icon');

    scrollButtons.forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();
            const link = e.target.getAttribute('data-link-to')
            const post = document.querySelector(`[data-post-link="${link}"]`)
            post.scrollIntoView()
        })
    })
    
    const routes = setSections(sections, thumbHolder)

    const theHash = location.hash.substr(1);

    if(routes.includes(theHash)) {
        document.querySelector(`[data-link="${theHash}"]`).click()
    } else {
        document.querySelector('.thumb').click()
    }

    window.addEventListener('resize', () => {
        changeVhVar()
        setTimeout(() => {
            const theHash = location.hash.substr(1);
            if(routes.includes(theHash)) {
                const section = document.querySelector(`[data-slug="${theHash}"]`)
                section.scrollIntoView()
            } else {
                document.querySelector('.thumb').click()
            }
        }, 200)
    });

})




