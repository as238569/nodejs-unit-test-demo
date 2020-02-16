// songs
imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
tooManyCooks = ['c', 'g', 'f'];
iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7', 'em7', 'a7', 'f7', 'b'];
toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7', 'g7'];
bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];

var songs = [];
var labels = [];
var allChords = [];
var labelCounts = {};
var chordCounts = {};
var labelProbabilities = {};
var chordCountsInLabels = {};
var probabilityOfChordsInLabels = {};

function train(chords, label) {
    songs.push({ 'label': label, 'chords': chords});
    
    if(!labels.includes(label)){
        labels.push(label);
    }

    chords.forEach((chord) => {
        if (!allChords.includes(chord)) { 
            allChords.push(chord); 
        }
    });

    if (Object.keys(labelCounts).includes(label)) {
        labelCounts[label]++;
    } else {
        labelCounts[label] = 1;
    }

    chords.forEach((chord) => {
        if(Object.keys(chordCounts).includes(chord)) {
            chordCounts[chord]++;
        } else {
            chordCounts[chord] = 1;
        }
    });
};



function getNumberOfSongs() {
    return songs.length;
};

function setLabelProbabilities() {
    Object.keys(labelCounts).forEach((label) => {
        let numberOfSongs = getNumberOfSongs();
        labelProbabilities[label] = labelCounts[label] / numberOfSongs;//計算每個難度出現的概率
    });
};

function setChordCountsInLabels() {
    songs.forEach(function (song) {
        if (chordCountsInLabels[song.label] === undefined) {
            chordCountsInLabels[song.label] = {};
        }

        song.chords.forEach(function (chord) {

            if (chordCountsInLabels[song.label][chord] > 0) {
                chordCountsInLabels[song.label][chord]++;                
            } else {
                chordCountsInLabels[song.label][chord] = 1;
            }
        });
    });
};

function setProbabilityOfChordsInLabels() {
    
    Object.keys(chordCountsInLabels).forEach(function (i) {
        Object.keys(chordCountsInLabels[i]).forEach(function (j) {

            if (probabilityOfChordsInLabels[i] === undefined) {
                probabilityOfChordsInLabels[i] = {};
            }
            probabilityOfChordsInLabels[i][j] = chordCountsInLabels[i][j] / chordCounts[j];//計算 該弦與該難易度的組合 在歌曲中出現的概率
        });
    });
};


//預測一組弦可能的難易度
function classify(chords) {

    var classified = {};
    Object.keys(labelProbabilities).forEach(function (obj) {
        var first = 0.0;
        let i = 0;
        chords.forEach(function (chord) {
            var probabilityOfChordInLabel = probabilityOfChordsInLabels[obj][chord];

            if (probabilityOfChordInLabel !== undefined) {
                first = first + probabilityOfChordInLabel ;  
               
            }
            if(allChords.includes(chord))
            {
                i++;
            }
        });    
        if(i !==  0)
        {
            first = first / i;
        }
        classified[obj] = first;
    });

    return classified;
};

function runtest(){

    train(imagine, 'easy');
    train(somewhere_over_the_rainbow, 'easy');
    train(tooManyCooks, 'easy');
    train(iWillFollowYouIntoTheDark, 'medium');
    train(babyOneMoreTime, 'medium');
    train(creep, 'medium');
    train(paperBag, 'hard');
    train(toxic, 'hard');
    train(bulletproof, 'hard');
    setLabelProbabilities();
    setChordCountsInLabels();
    setProbabilityOfChordsInLabels();

    console.log(classify(['d', 'g', 'e', 'dm']));
    console.log(classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']));
};


module.exports = {
    train: train,
    getNumberOfSongs: getNumberOfSongs,
    setLabelProbabilities : setLabelProbabilities,
    setChordCountsInLabels : setChordCountsInLabels,
    setProbabilityOfChordsInLabels: setProbabilityOfChordsInLabels,
    classify : classify,

    songs:songs,
    labels:labels,
    allChords:allChords,
    labelCounts:labelCounts,
    chordCounts:chordCounts,
    labelProbabilities:labelProbabilities,
    chordCountsInLabels:chordCountsInLabels,
    probabilityOfChordsInLabels:probabilityOfChordsInLabels
};