const MAX_SENATORS = 12;
const MAX_COUNCILORS = 8;

let selectedVotes = {
    senators: new Set(),
    congress: null,
    mayor: null,
    viceMayor: null,
    councilors: new Set()
};

document.addEventListener('DOMContentLoaded', function() {
    initializeVoteTracking();
    setupVoteValidation();
    setupSubmitButton();
});


function initializeVoteTracking() {
    document.querySelectorAll('input[name="senator"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            handleSenatorVote(this);
        });
    });

    document.querySelectorAll('input[name="congress"]').forEach(radio => {
        radio.addEventListener('change', function() {
            handleSingleVote(this, 'congress');
        });
    });

    document.querySelectorAll('input[name="mayor"]').forEach(radio => {
        radio.addEventListener('change', function() {
            handleSingleVote(this, 'mayor');
        });
    });

    document.querySelectorAll('input[name="vice-mayor"]').forEach(radio => {
        radio.addEventListener('change', function() {
            handleSingleVote(this, 'viceMayor');
        });
    });

    document.querySelectorAll('input[name="councilor"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            handleCouncilorVote(this);
        });
    });
}

function handleSenatorVote(checkbox) {
    if (checkbox.checked) {
        if (selectedVotes.senators.size >= MAX_SENATORS) {
            checkbox.checked = false;
            showAlert('You can only select up to 12 senators.');
            return;
        }
        selectedVotes.senators.add(checkbox.value);
    } else {
        selectedVotes.senators.delete(checkbox.value);
    }
    updateVoteCount('senator');
}

function handleCouncilorVote(checkbox) {
    if (checkbox.checked) {
        if (selectedVotes.councilors.size >= MAX_COUNCILORS) {
            checkbox.checked = false;
            showAlert('You can only select up to 8 councilors.');
            return;
        }
        selectedVotes.councilors.add(checkbox.value);
    } else {
        selectedVotes.councilors.delete(checkbox.value);
    }
    updateVoteCount('councilor');
}


function handleSingleVote(radio, position) {
    if (radio.checked) {
        selectedVotes[position] = radio.value;
    }
    updateVoteCount(position);
}


function updateVoteCount(position) {
    const countElement = document.querySelector(`#${position}-count`);
    if (countElement) {
        switch(position) {
            case 'senator':
                countElement.textContent = `${selectedVotes.senators.size}/${MAX_SENATORS}`;
                break;
            case 'councilor':
                countElement.textContent = `${selectedVotes.councilors.size}/${MAX_COUNCILORS}`;
                break;
            default:
                countElement.textContent = selectedVotes[position] ? '1/1' : '0/1';
        }
    }
}

function setupVoteValidation() {
    const submitButton = document.querySelector('.btn-primary');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (validateVotes()) {
                showConfirmation();
            }
        });
    }
}

function validateVotes() {
    if (selectedVotes.senators.size === 0) {
        showAlert('Please select at least one senator.');
        return false;
    }

    if (!selectedVotes.congress) {
        showAlert('Please select a congress representative.');
        return false;
    }

    if (!selectedVotes.mayor) {
        showAlert('Please select a mayor.');
        return false;
    }

    if (!selectedVotes.viceMayor) {
        showAlert('Please select a vice mayor.');
        return false;
    }

    if (selectedVotes.councilors.size === 0) {
        showAlert('Please select at least one councilor.');
        return false;
    }

    return true;
}

function showConfirmation() {
    const confirmed = confirm('Are you sure you want to submit your votes? This action cannot be undone.');
    if (confirmed) {
        submitVotes();
    }
}

function submitVotes() {    
    const voteData = {
        senators: Array.from(selectedVotes.senators),
        congress: selectedVotes.congress,
        mayor: selectedVotes.mayor,
        viceMayor: selectedVotes.viceMayor,
        councilors: Array.from(selectedVotes.councilors)
    };

    console.log('Votes submitted:', voteData);
    
    window.location.href = 'confirmation.html';
}

function showAlert(message) {
    alert(message);
}

function setupSubmitButton() {
    const submitButton = document.querySelector('.btn-primary');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (validateVotes()) {
                showConfirmation();
            }
        });
    }
} 