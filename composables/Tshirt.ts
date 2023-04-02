import {Canvas, loadSVGFromURL, Textbox, Image, util} from 'fabric'
import { FabricObject } from 'fabric/dist/src/shapes/Object/FabricObject'

export function useTshirt (id: string) {
  return new Tshirt(id, {
    width: 360,
    height: 442,
  }) 
}

interface ItextOptions {
  globalCompositeOperation?: String,
  fontFamily?: String,
  fontSize?: Number,
  fontWeight?: String,
  fontStyle?: String,
  underline?: Boolean,
}

export class Tshirt extends Canvas {
  vtext: Ref<string|null> = ref(null)

  constructor(id: string, option: Object) {
    super(id, option)
    
    this.mockup( `/img/mockup/kaos-o-neck-l-pendek/${id}` )
  }

  mockup(url: String){

    loadSVGFromURL(`${url}.svg`, (objects: Array<FabricObject>) => {
      let obj: FabricObject = util.groupSVGElements(objects)
      obj.set({
        _uid: 'svg',
        selectable: false
      })
      this.add(obj);
      
      Image.fromURL(`${url}.png`).then((image: FabricObject) => {
        image.set({
          selectable: false,
          globalCompositeOperation: 'source-atop',
          excludeFromExport: true,
        })
        this.add(image)
        this.renderAll()
      })
    }, null, null);
  }

  addText(_text: string, _options: ItextOptions) {

    let obj: FabricObject = this.getActiveObject()
    const options = {
      fontSize: 20,
      globalCompositeOperation: 'source-atop',
      fontFamily: 'Arial',
      ..._options
    }

    
    if(obj && obj instanceof Textbox) {

      if(_text === '') {
        this.remove(obj)
        return
      }
      obj.set( {...options, text: _text} )
    }
    else{
      obj = new Textbox(_text, options)
      this.centerObject(obj)
      this.add( obj )
      this.setActiveObject(obj)
    }
  
    this.renderAll()
    return obj
  }
  
  addImage(src: string){
    Image.fromURL(src).then((image: FabricObject) => {
      image.scaleToWidth(200)
      image.set({
        globalCompositeOperation: 'source-atop',
        left: 100,
        top: 100,
      })
      this.add(image)
      this.centerObjectH(image)
      this.renderAll()
    })
  }
}