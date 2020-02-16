var assert = require("chai").assert;
var app = require("./app");

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

describe(" test app", function(){

     
    app.train(imagine, 'easy');
    app.train(somewhere_over_the_rainbow, 'easy');
    app.train(tooManyCooks, 'easy');
    app.train(iWillFollowYouIntoTheDark, 'medium');
    app.train(babyOneMoreTime, 'medium');
    app.train(creep, 'medium');
    app.train(paperBag, 'hard');
    app.train(toxic, 'hard');
    app.train(bulletproof, 'hard');
    app.setLabelProbabilities();
    app.setChordCountsInLabels();
    app.setProbabilityOfChordsInLabels();
    
    it("check if songs array equal", function(){   
        
        let expected = [
            {label: 'easy', chords: imagine},
            {label: 'easy', chords: somewhere_over_the_rainbow},
            {label: 'easy', chords: tooManyCooks},
            {label: 'medium', chords: iWillFollowYouIntoTheDark},
            {label: 'medium', chords: babyOneMoreTime},
            {label: 'medium', chords: creep},
            {label: 'hard', chords: paperBag},
            {label: 'hard', chords: toxic},
            {label: 'hard', chords: bulletproof}
        ];        

        assert.deepEqual(app.songs, expected);
    })

    it("check if labels array equal", function(){   
        
        let expected = ['easy','medium','hard'];        

        assert.deepEqual(app.labels, expected);
    })

   
    it("check if allChords array equal", function(){   
        
        let expected = [
            'c', 'cmaj7', 'f', 'am',"dm","g","e7",
            "em",
            "bb","a","bbm",
            "cm","eb","fm","ab",
            "gsus4","b","bsus4","cmsus4","cm6",
            "bm7","e","b7","em7","a7","f7",
            "cdim","eb7","d7","db7","gmaj7","g7",
            "d#m","g#","f#","g#m","c#"
        ];        

        assert.deepEqual(app.allChords, expected);
    })

    it("check if labelCounts equal", function(){    

        let expected = {easy: 3, medium: 3, hard: 3 };        

        assert.deepEqual(app.labelCounts, expected);
    })

    it("check if chordCounts equal", function(){    
               
        let expected = {
            "a": 2, "a7": 1, "ab": 2, "am": 2, "b": 3,  "b7": 1,  "bb": 2,  "bbm": 1
            ,  "bm7": 1,  "bsus4": 1,  "c": 6,  "c#": 1,  "cdim": 1,  "cm": 2
            ,  "cm6": 1,  "cmaj7": 2,  "cmsus4": 1,  "d#m": 1,  "d7": 1,  "db7": 1
            ,  "dm": 2,  "e": 1,  "e7": 1,  "eb": 2,  "eb7": 1,  "em": 2,  "em7": 1
            ,  "f": 5,  "f#": 1,  "f7": 1,  "fm": 1,  "g": 7,  "g#": 1, "g#m": 1,
            "g7": 1, "gmaj7" : 1,"gsus4": 1};        

        assert.deepEqual(app.chordCounts, expected);
    })
    

    it("check if labelProbabilities equal", function(){    
               
        let expected = {
            easy: 0.3333333333333333,
            hard: 0.3333333333333333,
            medium: 0.3333333333333333
        };        

        assert.deepEqual(app.labelProbabilities, expected);
    })

    it("check if chordCountsInLabels equal", function(){    
               
        let expected = {
            easy: {
                "am": 2, "c": 3, "cmaj7": 1, "dm": 1, "e7": 1, "em": 1, "f": 3, "g": 3
            },  
            hard: {
                "a": 1, "a7": 1, "ab": 1, "b": 2, "b7": 1, "bm7": 1, "c": 1, "c#": 1, "cdim": 1
                , "cm": 1, "cmaj7": 1, "d#m": 1, "d7": 1, "db7": 1, "e": 1, "eb": 1, "eb7": 1
                , "em": 1, "em7": 1, "f": 1, "f#": 1, "f7": 1, "g": 2, "g#": 1, "g#m": 1, "g7": 1
                ,"gmaj7": 1
            },  
            medium: {
                "a": 1, "ab": 1, "b": 1, "bb": 2, "bbm": 1, "bsus4": 1, "c": 2, "cm": 1, "cm6": 1
                ,"cmsus4": 1, "dm": 1, "eb": 1, "f": 1, "fm": 1, "g": 2 , "gsus4": 1 
            }
        };        

        assert.deepEqual(app.chordCountsInLabels, expected);
    })    

    it("check if probabilityOfChordsInLabels equal", function(){    
               
        let expected = {
            easy: {
                "am": 1, "c": 0.5, "cmaj7": 0.5, "dm": 0.5, "e7": 1, "em": 0.5, "f": 0.6, "g": 0.42857142857142855
            },
            hard: {
                "a": 0.5, "a7": 1, "ab": 0.5, "b": 0.6666666666666666, "b7": 1, "bm7": 1, "c": 0.16666666666666666
                ,"c#": 1, "cdim": 1, "cm": 0.5, "cmaj7": 0.5, "d#m": 1, "d7": 1, "db7": 1, "e": 1, "eb": 0.5
                ,"eb7": 1, "em": 0.5, "em7": 1, "f": 0.2, "f#": 1, "f7": 1, "g": 0.2857142857142857, "g#": 1
                ,"g#m": 1, "g7": 1, "gmaj7": 1
            },
            medium: {
                "a": 0.5, "ab": 0.5, "b": 0.3333333333333333, "bb": 1, "bbm": 1, "bsus4": 1, "c": 0.3333333333333333
                ,"cm": 0.5, "cm6": 1, "cmsus4": 1, "dm": 0.5, "eb": 0.5, "f": 0.2, "fm": 1, "g": 0.2857142857142857
                ,"gsus4": 1
            }
        };

        assert.deepEqual(app.probabilityOfChordsInLabels, expected);
    })

    it("check if classify equal", function(){    
               
        //Test1
        let result1 = app.classify(['c']);
        let expected1 = {
            easy: 0.5,
            medium: 0.3333333333333333,
            hard: 0.16666666666666666
        };
        assert.deepEqual(result1, expected1);

        //Test2
        let result2 = app.classify(['d', 'g', 'e', 'dm']);
        let expected2 = {
            easy: 0.30952380952380953,
            medium: 0.2619047619047619,
            hard: 0.42857142857142855
        };
        assert.deepEqual(result2, expected2);    

        //Test3
        let result3 = app.classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);
        let expected3 = {
            easy: 0,
            medium: 0.25,
            hard: 0.75
        };
        assert.deepEqual(result3, expected3); 

        //Test4
        let result4 = app.classify(['f']);
        let expected4 = {
            easy: 0.6,
            medium: 0.2,
            hard: 0.2
        };
        assert.deepEqual(result4, expected4); 

    })
})