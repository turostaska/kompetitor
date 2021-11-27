
export default class CompetitorViewDTO{
    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.getName=function(){
            return this.name;
        }
        this.getId=function(){
            return this.id;
        }
        this.getType=function(){
            return this.type;
        }
    }
}