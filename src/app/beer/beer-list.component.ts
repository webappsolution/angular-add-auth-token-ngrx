import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit
} from "@angular/core";
import { Beer } from "../core/domain/beer.model";

import { trackByFn } from "../util/angular.util";

@Component({
    selector: "blog-beer-list",
    templateUrl: "./beer-list.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeerListComponent implements OnInit {

    /**
     * List of beers to display.
     */
    @Input()
    public beers: Beer[];

    /**
     * Used to track items in the ngFor for better performance.
     */
    public trackBeer: Function = trackByFn;

    /**
     * Initialize the component.
     */
    public ngOnInit() {
    }
}
