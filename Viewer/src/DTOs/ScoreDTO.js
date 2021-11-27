import React from 'react';

class ScoreDTO {
    constructor(name, score) {
        this.name = name;
        this.score = score;
        this.getName = () => {
            return this.name;
        }
        this.getScore = () => {
            return this.score;
        }
    }
}
export default ScoreDTO