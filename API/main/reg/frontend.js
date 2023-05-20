function RegUser(){
    const log = document.getElementById('log');
    const pas = document.getElementById('pas');
    const phone = document.getElementById('phone');
    const mail = document.getElementById('mail');
    fetch
    ('/api/createuser', 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify
            (
                {
                    log: log.value,
                    pas: pas.value,
                    phone: phone.value,
                    mail: mail.value
                }
            )
        }
    )
    .then(function(response) 
    {
        if (!response.ok) 
        {
            return Promise.reject(new Error('Response failed: ' + response.status + ' (' + response.statusText + ')'));
        }
        return response.json();
    })
    .then(function(data) 
    {
        if(data.error == null)
        {
            alert('Вы успешно зарегистрированы!');
        }
        else
        {
            alert('Вы не зарегистрированы!');
        }
    })
    .catch(function(error) 
    {
        alert('Вы не зарегистрированы!');
    });
}