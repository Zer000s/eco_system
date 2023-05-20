function AuthUser(){
    const log = document.getElementById('log');
    const pas = document.getElementById('pas');
    fetch
    ('api/authuser', 
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
                    pas: pas.value
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
        if(data.length == 0)
        {
            alert('Нет такого пользователя!');
        }
        else
        {
            location.href='./users_page/index.html';
        }
    })
    .catch(function(error) 
    {

    });
}