import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Cheerio } from 'cheerio';
import { ClassName } from './class/class-name.const';
import { Profile } from './class/profile.model';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModuleConsts } from './class/ModuleConsts.const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  title = 'insta-analyzer';
  cheerio = require('cheerio');
  readonly ModuleConsts = ModuleConsts;

  followers: Profile[] = [];
  following: Profile[] = [];
  notFollowBack: Profile[] = [];
  notFollowYou: Profile[] = [];
  processed = false;
  state = '';
  stateStyle = {};

  @ViewChild('followersTextarea') followersTextarea!: ElementRef;
  @ViewChild('followingTextarea') followingTextarea!: ElementRef;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.compare();
    // this.processed = false;
  }

  ngOnDestroy(): void {
    this.followers.length = 0;
    this.following.length = 0;
    this.notFollowBack.length = 0;
    this.notFollowYou.length = 0;
  }

  /**
   * compare
   */
  compare() {
    this.followersDataProcessor(this.followersTextarea.nativeElement.value);
    this.followingDataProcessor(this.followingTextarea.nativeElement.value);
    this.notFollowBack = this.followers.filter(x => {
      let res: boolean = false;
      this.following.forEach(pf => {
        if (pf.isSame(x)) {
          res = true;
        }
      })
      return res ? false : true;
    });
    this.notFollowYou = this.following.filter(x => {
      let res: boolean = false;
      this.followers.forEach(pf => {
        if (pf.isSame(x)) {
          res = true;
        }
      })
      return res ? false : true;
    });
    this.setState();
    this.processed = true;
  }

  /**
   * reset
   */
  reset() {
    this.followers.length = 0;
    this.following.length = 0;
    this.notFollowBack.length = 0;
    this.notFollowYou.length = 0;

    this.followersTextarea.nativeElement.value = ''
    this.followingTextarea.nativeElement.value = ''
    this.processed = false;
    this.state = '';
  }

  /**
   * setState
   * @returns 
   */
  setState() {
    if (this.followers.length > this.following.length) {
      this.state = 'Followers>';
      this.stateStyle = { color: 'Crimson' };
      return;
    }
    if (this.followers.length < this.following.length) {
      this.state = '<Following';
      this.stateStyle = { color: 'Orange' };
      return;
    }
    if (this.followers.length == this.following.length) {
      this.state = 'Balance';
      this.stateStyle = { color: 'SeaGreen' };
      return;
    }
  }

  /**
   * followerDataProcessor
   * @param xmlData textarea's string 
   */
  followersDataProcessor(xmlData: any) {
    this.followers.length = 0;
    xmlData = xmlData.replaceAll(ClassName.container, 'container')
      .replaceAll(ClassName.avatar, 'avatar')
      .replaceAll(ClassName.id, 'id')
      .replaceAll(ClassName.name, 'name')
      .replaceAll(ClassName.verified, 'verified');
    let $ = this.cheerio.load(xmlData);

    let container: Cheerio<any> = $('.container');
    container.each((i: number, el: any) => {
      const avatar = $(el).find('.avatar').get(0)?.attribs.src;
      const id = $(el).find('.id').get(0).children[0]?.data?.trim();
      const name = $(el).find('.name').get(1).children[0]?.data?.trim();
      const verified = $(el).find('.verified').get(0) ? true : false;
      this.followers.push(new Profile(avatar, id, name, `${ClassName.prefix_href}/${id}`, verified));
    })
  }

  /**
   * followingDataProcessor
   * @param xmlData textarea's string 
   */
  followingDataProcessor(xmlData: any) {
    this.following.length = 0;
    xmlData = xmlData.replaceAll(ClassName.container, 'container')
      .replaceAll(ClassName.avatar, 'avatar')
      .replaceAll(ClassName.id, 'id')
      .replaceAll(ClassName.name, 'name')
      .replaceAll(ClassName.verified, 'verified');
    let $ = this.cheerio.load(xmlData);

    let container: Cheerio<any> = $('.container');
    container.each((i: number, el: any) => {
      const avatar = $(el).find('.avatar').get(0)?.attribs.src;
      const id = $(el).find('.id').get(0).children[0]?.data?.trim();
      const name = $(el).find('.name').get(1).children[0]?.data?.trim();
      const verified = $(el).find('.verified').get(0) ? true : false;
      this.following.push(new Profile(avatar, id, name, `${ClassName.prefix_href}/${id}`, verified));
    })
  }


  /**
   * toBottomClick
   * @param index 
   * @param target 
   */
  toBottomClick(index: any, target: Profile[]) {
    if (target === ModuleConsts.notFollowBack) {
      moveItemInArray(this.notFollowBack, index, this.notFollowBack.length - 1);
    } else if (target === ModuleConsts.notFollowYou) {
      this.notFollowYou.push(this.notFollowYou.splice(index, 1)[0]);
    }
  }

  /**
   * toDeleteClick
   * @param index 
   * @param target 
   */
  toDeleteClick(index: any, target: Profile[]) {
    if (target === ModuleConsts.notFollowBack) {
      this.notFollowBack.splice(index, 1);
    } else if (target === ModuleConsts.notFollowYou) {
      this.notFollowYou.splice(index, 1);
    }
  }


  /**
   * CdkDrag dropped
   * @param event 
   * @param target 
   */
  dropped(event: CdkDragDrop<any> | any, target: Profile[]) {
    if (target === ModuleConsts.notFollowBack) {
      moveItemInArray(this.notFollowBack, event.previousIndex, event.currentIndex);
    } else if (target === ModuleConsts.notFollowYou) {
      moveItemInArray(this.notFollowYou, event.previousIndex, event.currentIndex);
    }
  }
}
