const deleteBtn = document.querySelectorAll('.del')

Array.from(deleteBtn).forEach((el)=> {
    el.addEventListener('click', deleteEvent)
})

async function deleteEvent() {
    alert('Del btn clicked...')
    const entryToDel = this.parentNode.childNodes[1].innerText
    alert(entryToDel)
    try {
        const response = await fetch('deleteEntry', {
            method: 'DELETE',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'deletedEntry': entryToDel,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}