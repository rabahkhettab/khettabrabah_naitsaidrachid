import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';
import { MoviesService } from '../../services/movies/movies.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-exercice2',
  templateUrl: './exercice2.component.html',
  styleUrls: ['./exercice2.component.scss']
})
export class Exercice2Component implements OnInit {

    data: any;

    video: any;

    description: string;

    urlSafe: SafeResourceUrl;

    videoSelected: boolean = false;

    loading: boolean;

    loadingVideo: boolean;

    error: boolean = false;

    mySlideOptions={
        items:5,
        autoplay:true,
        autoplaySpeed:100,
        dots: false,
        nav:true,
        navText: [
            '<p style="position: absolute;top: 100px;left: -50px"><img style="border: 2px solid #fd0041;padding: 5px 0" width="32" src="../../../assets/left-chevron.png"/></p>',
            '<p style="position: absolute;top: 100px;right: -50px"><img style="border: 2px solid #fd0041;padding: 5px 0" width="32" src="../../../assets/right-chevron.png"/></p>' ],
        };
  
    constructor(private $ser:MoviesService,public sanitizer: DomSanitizer) { }

    ngOnInit() {
      this.getData();
    }

    getSafeUrl(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }

    getData() {
      const observable = this.$ser.getData().pipe(
          finalize(() => this.loading = false)
      );
      this.loading = true;
      const _this = this;
      observable.subscribe(
          s => {
              _this.data = s.results;
              console.log(_this.data);
          },
          error => this.error = true
      );
    }

    getVideo(id,text) {
        const observable = this.$ser.getVideo(id).pipe(
            finalize(() => this.loadingVideo = false)
        );
        this.loadingVideo = true;
        const _this = this;
        observable.subscribe(
            s => {
                this.loadingVideo = false;
                this.videoSelected = true;
                this.description = text;
                _this.video = s.results[0];
                this.urlSafe = this.getSafeUrl('https://www.youtube.com/embed/'+_this.video.key);
            },
            error => this.error = true
        );
    }
}
