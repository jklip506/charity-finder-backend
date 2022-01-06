import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/hello/SpacesTable/Update';

const event: APIGatewayProxyEvent = {
    body: {
        name: 'someName',
        location: 'someLocation'
    }
} as any;

const result =  handler(event, {} as any).then((apiResult) => {

    const items = JSON.parse(apiResult.body);
    console.log(123)
});