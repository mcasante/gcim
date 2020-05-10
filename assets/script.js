const selectAll = query => Array.from(document.querySelectorAll(query))

function setThumbs(sections, holder) {
    sections.forEach(s => {
        holder.appendChild(
            createThumb(s)
        )
    })
}

function createThumb(section) {
    const title = section.getAttribute('data-title')
    const div = document.createElement('div')
    div.classList.add('thumb')
    div.innerHTML = `<span>${title}</span>`

    div.addEventListener('click', function() {
        selectAll('.thumb').forEach(t => t.classList.remove('active'))
        section.scrollIntoView({behavior: "smooth"})
        this.classList.add('active')
    })

    return div
}

window.addEventListener('load', function(){
    const sections = selectAll('#main section')
    const thumbHolder = document.querySelector('#thumbnails .thumbholder')
    
    setThumbs(sections, thumbHolder)
})
