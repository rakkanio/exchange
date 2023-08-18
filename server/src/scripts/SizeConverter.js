
import glob from 'glob'
import path from 'path'
import sharp from 'sharp'
sharp.cache(false);

const resize = async()=>{
    const canvasDirPath = `./../../assets/**/*`
    glob(canvasDirPath, async(err,result)=>{
        let count=0
        for (const item of result) {
            if((!item.includes('thumbnail')) && ((String(item).toLowerCase().includes('png') || String(item).toLowerCase().includes('jpeg')))){
                let fileLocation = path.dirname(item)
                let fileName =  path.basename(item)
                const image = await sharp(item);
                let buffer
                const metadata = await image.metadata();
                await sharp(item).toFile(`${fileLocation}/original_${fileName}`)
                if(metadata.format.toLowerCase() === 'png'){
                   buffer =  await sharp(item).resize({ height: metadata.height, width: metadata.width }).png({quality:10}).toBuffer()
                   sharp(buffer).toFile(item)
                }else if(metadata.format.toLowerCase() === 'jpeg'){
                   buffer = await sharp(item).resize({ height: metadata.height, width: metadata.width }).jpeg({quality:10}).toBuffer()
                    sharp(buffer).toFile(item)

                }
                console.log(`proccessed image count is ${count++}`)
            }
        }
        console.log('proccess completed')
    })
}

const  SizeConverterModel= {
    resize:resize
    }
    
export default SizeConverterModel
//start proccess
resize()