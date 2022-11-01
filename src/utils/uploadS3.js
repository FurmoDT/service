import S3 from 'react-aws-s3';

export const uploadS3 = async (filename) => {
    const config = {
        bucketName: 'subtitleqc',
        region: process.env.REACT_APP_AWS_REGION,
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    }
    const ReactS3Client = new S3(config);
    const ipData = await fetch('https://geolocation-db.com/json/');
    const locationIp = await ipData.json();
    const curr = new Date()
    ReactS3Client.uploadFile([], `${new Date(curr.getTime() + curr.getTimezoneOffset() * 60 * 1000 + 9 * 60 * 60 * 1000)}${locationIp.IPv4}${filename}`)
}