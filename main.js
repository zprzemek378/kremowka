let gameOver = 0;
let numOfKremowka = 0;
let numOfKremowkaFinished = 0;
let frequency = 1;

function falling()
{

    

    for(i=numOfKremowkaFinished+1; i<=numOfKremowka; i++)
    {
        let top = getComputedStyle(document.getElementById(`x${i}`)).getPropertyValue("top")
        top = parseInt(top, 10);

        if(top == 485)
        {
            let leftPose = getComputedStyle(document.getElementById(`x${i}`)).getPropertyValue("left")
            leftPose = parseInt(leftPose, 10);

            if(matchedKremowka(leftPose) == true)
            {
                document.getElementById(`x${i}`).remove();
                numOfKremowkaFinished++;
                document.getElementById("score").innerHTML = `Kremówek: ${numOfKremowkaFinished}`
            }

            else
            {
                gameOver = 1
            }

        }
        
        else
        {
            top = top/1 + 5;
            document.getElementById(`x${i}`).style.setProperty("top", top + "px");
        }
    }

    if(gameOver == 0)    setTimeout(falling, 100/frequency);
    else endGame();
}


function matchedKremowka(pose)
{
    let barka = getComputedStyle(document.getElementById("barka")).getPropertyValue("--poseleft")
    barka = parseInt(barka, 10);

    if(pose-barka<227 && pose-barka>-38) return true;
    else return false;
}

function endGame()
{
    alert("Koniec gry! Wynik: " + numOfKremowkaFinished);
    document.location.reload()
}



onkeydown = clicked;
function clicked(button)
{
    let clickedButton = button.key;

    if(clickedButton == "a" || clickedButton == "A")
    {
        move(0);
    }

    if(clickedButton == "d" || clickedButton == "D")
    {
        move(1);
    }
}

function move(site)
{
    let left = getComputedStyle(document.getElementById("barka")).getPropertyValue("--poseleft")
    left = parseInt(left, 10);

    if(site == 0)
    {
        left = left/1 - 20;
        document.getElementById("barka").style.setProperty("--poseleft", left + "px")
    }

    if(site == 1)
    {
        left = left/1 + 20;
        document.getElementById("barka").style.setProperty("--poseleft", left + "px")
    }

    
    console.log(left);


}


function spawnKremowka()
{
    numOfKremowka+=1;

    let pose = Math.floor(Math.random() * 920);

    const newKremowka = document.createElement('div');

    newKremowka.innerHTML = 
    `
    <div id="x${numOfKremowka}" class="kremDIV" style="left:${pose}px;">
    <img class="krem" src="img/kremowka.png" />
    </div>
    `;


    document.getElementById(`spawnPlace`).insertAdjacentElement("afterbegin", newKremowka);
}

function start(level)
{
    if(level == 1) frequency = 1.5;
    if(level == 2) frequency = 2;
    if(level == 3) frequency = 2.7;
    repeatSpawning();
    falling()
    document.getElementById("start1").remove();
    document.getElementById("start2").remove();
    document.getElementById("start3").remove();
    changeFrequency();
}

function repeatSpawning()
{
    spawnKremowka();
    setTimeout(repeatSpawning, 5000/frequency)
}

function changeFrequency()
{
    frequency = frequency * 1.05;

    setTimeout(changeFrequency, 5000);
}