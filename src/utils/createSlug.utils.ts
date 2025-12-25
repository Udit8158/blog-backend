export default function createSlug(title: string) : string{
    // How To Learn Code -> how-to-learn-code
    const slug = title.trim().replace(/\s+/g, '-').toLowerCase() + '-' + Date.now()
    
    return slug
}


// console.log(createSlug("  How  To  Learn  Code  "))