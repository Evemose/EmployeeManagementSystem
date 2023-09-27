import {useRef} from "react";

export function useIsFirstRender(): boolean {
    const isFirst = useRef(true);

    if (isFirst.current) {
        isFirst.current = false;
        return true;
    }

    return isFirst.current;
}

export function generateRequestParams(params: Map<string, Set<string>>) : string {
    let requestParams = '?';

    console.log(params);


    params.forEach((value, key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (value.size > 0) {
            requestParams += `${key}=${Array.from(value).join(',')}`;
            if (requestParams[requestParams.length - 1] === ',') {
                requestParams = requestParams.slice(0, -1);
            }
            requestParams += '&';
        }
    });

    return requestParams.replace('#', '%23').slice(0, -1);
}