import { SWIBLY_API } from "$env/static/private";
import { SwiblyClient } from "swibly-sdk";

export const client = new SwiblyClient( {key: SWIBLY_API} );