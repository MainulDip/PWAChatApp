const camera = new Camera($('#player')[0]);
console.log('Network First Strategies');
const _init = () => {
    const messages = new Message();

    window.addEventListener('messages_error', () => {
        toastr.error('could not be retrived. will keep trying', 'Network Connecion Error');
    });

    window.addEventListener('new_message', (e) => {
        renderMessage(e.detail);
    });

    window.addEventListener('messages_ready', () => {
        $('#loader').remove();
        if(messages.all.length == 0) toastr.info('Add The Firest Message', 'No Messages');
        $('#messages').empty();
        messages.all.reverse().forEach(renderMessage);
    });

    $('#viewfinder').on('shown.bs.modal', () => {
        // console.log('camera triggered')
        camera.switch_on();
    })
    $('#viewfinder').on('hidden.bs.modal', () => {
        // console.log('camera not active now')
        camera.switch_off();
    })
    $('#shutter').on('click', (e) => {
        // console.log('Takeing Photo')
        let photo = camera.take_photo();
        $('#camera').css('background-image', `url(${photo})`).addClass('withphoto');
    })
    $('#send').on('click', (e) => {
        let caption = $('#caption').val();

        if (!camera.photo || !caption) {
            toastr.warning('Photo And Caption Requried', 'Incomplete Message Being Send')
            return;
        }
        // console.log('Adding Message');

        let message = messages.add(camera.photo, caption);
        // console.log(messages.all);
        renderMessage(message);
        $('#caption').val('');
        $('#camera').css('background-image', '').removeClass('withphoto');
        camera.photo = null;
    })
}

// function renderMessage(){}

const renderMessage = message => {
    let msgHTML = `
	<div style="display: none;" class="row message bg-light rounded shadow">
	<div class="col-2 p-1">
	<img src="${message.photo}" class="photo w-100 rounded" >
	</div>
	<div class="col-10 p-1">${message.caption}</div>
	</div>
	`;

    $(msgHTML).prependTo('#messages').show(400)
        .find('img').on('click', showPhoto);
}


const showPhoto = (e) => {


    let photoSrc = $(e.currentTarget).attr('src');


    $('#photoframe img').attr('src', photoSrc);

    // console.log($('#photoframe'));

    $('#photoframe').modal("show");


    // console.log('showing the photo');
}