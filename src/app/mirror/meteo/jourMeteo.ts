export class jourMeteo {

private date: string;
private condition: string;
private conditionLabel: string;
private tmax: string;
private tmin: string;
private tmp: string;
private imgUrl: string;

constructor(date:string,condition:string,condtionLabel:string,tmax:string,tmin:string,tmp:string) { 
  this.date = date;
  this.condition = condition;
  this.conditionLabel = condtionLabel;
  this.tmax = tmax != null ? tmax+' C°' : tmax;
  this.tmin = tmin != null ? tmin+' C°' : tmin;
  this.tmp = tmp != null ? tmp+' C°' : tmp;
  this.createImgUrl();
}

  getDate(){
    return this.date;
  }
  getCondition(){
    return this.condition;
  }
  getConditionLabel(){
    return this.conditionLabel;
  }
  getTmax(){
    return this.tmax;
  }
  getTmin(){
    return this.tmin;
  }
  getTmp(){
    return this.tmp;
  }
  createImgUrl(){
    this.imgUrl = 'assets/img/'+this.conditionLabel+'.png';
  }
}