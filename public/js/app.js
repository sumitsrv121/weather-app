const myForm = document.getElementById("myForm")
const searchText = document.querySelector('input')
const maxTempText = document.querySelector('#message1')

myForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = searchText.value
    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error || data.errorMessage) {
                if (data.error)
                    document.getElementById("message").innerHTML = data.error
                else
                    document.getElementById("message").innerHTML = data.errorMessage
                return
            }
            document.getElementById("message").innerHTML = data.message
            maxTempText.textContent = data.maxTemperature
        })
    })
})