const ResizerOptions = require('../src/resizerOptions')
const Headers = require('fetch-headers');

it('Handles correctly default options', () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/plain');
    myHeaders.append('Accept', 'image/webp, */*');
    myHeaders.append('Accept-Encoding','gzip, deflate, br')
    myHeaders.append('Connection','keep-alive')
    const resizerOptions = new ResizerOptions(myHeaders,800)

    expect(resizerOptions.getOptions().cf.image.quality).toBe('85')
    expect(resizerOptions.getOptions().cf.image.fit).toBe('scale-down')
    expect(resizerOptions.getOptions().cf.image.metadata).toBe('copyright')
    expect(resizerOptions.getOptions().cf.image.sharpen).toBe(1.0)
    expect(resizerOptions.getOptions().cf.image.width).toBe(800)
    expect(resizerOptions.getOptions().cf.image.format).toBe('webp')
});

it('Handles correctly default options, absence of Accept header and negative img size', () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/plain');
    myHeaders.append('Accept-Encoding','gzip, deflate, br')
    myHeaders.append('Connection','keep-alive')
    const resizerOptions = new ResizerOptions(myHeaders,-1)

    expect(resizerOptions.getOptions().cf.image.quality).toBe('85')
    expect(resizerOptions.getOptions().cf.image.fit).toBe('scale-down')
    expect(resizerOptions.getOptions().cf.image.metadata).toBe('copyright')
    expect(resizerOptions.getOptions().cf.image.sharpen).toBe(1.0)
    expect(resizerOptions.getOptions().cf.image.width).toBe(1000)
    expect(resizerOptions.getOptions().cf.image.format).toBe('auto')
});

it('Caps the size at 1000px', () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/plain');
    myHeaders.append('Accept', 'image/webp, */*');
    myHeaders.append('Accept-Encoding','gzip, deflate, br')
    myHeaders.append('Connection','keep-alive')
    const resizerOptions = new ResizerOptions(myHeaders,1800)

    expect(resizerOptions.getOptions().cf.image.quality).toBe('85')
    expect(resizerOptions.getOptions().cf.image.fit).toBe('scale-down')
    expect(resizerOptions.getOptions().cf.image.metadata).toBe('copyright')
    expect(resizerOptions.getOptions().cf.image.sharpen).toBe(1.0)
    expect(resizerOptions.getOptions().cf.image.width).toBe(1000)
});

it('Selects webp format if available', () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/plain');
    myHeaders.append('Accept', 'image/webp, */*');
    myHeaders.append('Accept-Encoding','gzip, deflate, br')
    myHeaders.append('Connection','keep-alive')
    const resizerOptions = new ResizerOptions(myHeaders,1800)

    expect(resizerOptions.getOptions().cf.image.quality).toBe('85')
    expect(resizerOptions.getOptions().cf.image.fit).toBe('scale-down')
    expect(resizerOptions.getOptions().cf.image.metadata).toBe('copyright')
    expect(resizerOptions.getOptions().cf.image.sharpen).toBe(1.0)
    expect(resizerOptions.getOptions().cf.image.width).toBe(1000)
    expect(resizerOptions.getOptions().cf.image.format).toBe('webp')
});

it('Selects auto format if none other available', () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'text/plain');
    myHeaders.append('Accept', 'image/foo, image/bar, */*');
    myHeaders.append('Accept-Encoding','gzip, deflate, br')
    myHeaders.append('Connection','keep-alive')
    const resizerOptions = new ResizerOptions(myHeaders,200)

    expect(resizerOptions.getOptions().cf.image.quality).toBe('85')
    expect(resizerOptions.getOptions().cf.image.fit).toBe('scale-down')
    expect(resizerOptions.getOptions().cf.image.metadata).toBe('copyright')
    expect(resizerOptions.getOptions().cf.image.sharpen).toBe(1.0)
    expect(resizerOptions.getOptions().cf.image.width).toBe(200)
    expect(resizerOptions.getOptions().cf.image.format).toBe('auto')
});
