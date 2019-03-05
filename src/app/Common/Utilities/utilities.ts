import { Subject } from "rxjs/internal/Subject";
import { OnDestroy } from "@angular/core";

export class Utilities implements OnDestroy {
    /* Piped with takeUntil to automatically unsub from subscriptions on component destruction. */
    componentDestroyed$: Subject<void> = new Subject();

    static isValidObject(obj: Object){
        return obj !== undefined && obj !== null;
    }
    static isNullOrEmpty(value: string){
        return !this.isValidObject(value) || value.length === 0;
    }

    ngOnDestroy() {
        this.componentDestroyed$.next();
        this.componentDestroyed$.complete();
    }
}