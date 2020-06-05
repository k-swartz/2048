export class Square {
    constructor(Value = 0, OriginalLocation = {}, HasMerged = false) {
        this.Value = Value;
        this.OriginalLocation = OriginalLocation;
        this.HasMerged = HasMerged;
    }

    ClearData() {
        this.HasMerged = false;
        this.OriginalLocation = {};
    }

    HasValue() {
        return this.Value > 0;
    }

    Merge() {
        this.Value = this.Value * 2;
        this.HasMerged = true;
    }

    MoveFrom(Location) {
        if (this.OriginalLocation.X === undefined) {
            this.OriginalLocation = Location;
        }
    }
}
