import React from 'react';

class ScoreDto {
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
export default ScoreDto