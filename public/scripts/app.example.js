class App {
  constructor() {

    this.loadButton = document.getElementById("search-button");
    this.carContainerElement = document.getElementById("car-container-element");
    this.availDate = document.getElementById('avail-date');
    this.availTime = document.getElementById('avail-time');
    this.carCapacity = document.getElementById('car-capacity');
    
    
  }
  
  async init() {
    await this.load();

    // Register click listener
    
    this.loadButton.onclick = this.run;
  }

  run = async () => {
    await this.load()
    this.clear()
    Car.list.forEach((car) => { 
      const node = document.createElement('div');
      node.className = 'col-lg-4'
      node.innerHTML = car.render();
      this.carContainerElement.append(node);
    });
  };

  async load() {
    const tanggal = this.availDate.value;
    const jam = this.availTime.value;
    const kapasitas = this.carCapacity.value;
    console.log('car capacity ', kapasitas)
    console.log('jam ', jam)
    console.log('tanggal', tanggal)


    const carAvailable = new Date(`${tanggal} ${jam}`) //creating new dateTime object
    console.log(carAvailable)
    const epochTime = carAvailable.getTime() //parse dateTime object into milliseconds
    console.log('epoch', epochTime)
    
    const cars = await Binar.listCars((item) =>{
      const filterCapacity = item.capacity >= kapasitas;
      const filterDateTime = item.availableAt.getTime() < epochTime
      return filterCapacity && filterDateTime
    });
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
