import { Length } from 'class-validator';

    export class ReturnCurrencyQuoteDto {
        @Length(3)
        to: string

        @Length(3)
        from: string
    }