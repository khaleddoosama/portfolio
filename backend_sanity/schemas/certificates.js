export default {
    name: 'certificates',
    title: 'certificates',
    type: 'document',
    fields: [
        {
            name: 'imgurl',
            title: 'ImageUrl',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'desc',
            title: 'Desc',
            type: 'string'
        }
    ]
}