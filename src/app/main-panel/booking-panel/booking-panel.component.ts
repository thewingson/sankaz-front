import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DictEntity } from 'src/app/model/DictEntity';
import { BookingService } from 'src/app/services/booking.service';
import { Booking, BookingStatus } from 'src/app/model/Booking';
import { Option } from 'src/app/model/Option';
import { RoomClassService } from 'src/app/services/roomClass.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { Sanatory } from 'src/app/model/Sanatory';
import { SanService } from 'src/app/services/san.service';
import { BookingHistory } from 'src/app/model/BookingHistory';

@Component({
  selector: 'app-booking-panel',
  templateUrl: './booking-panel.component.html',
  styleUrls: ['./booking-panel.component.css'],
})
export class BookingPanelComponent implements OnInit {
  title = 'Брони';
  @Input('ELEMENT_DATA') ELEMENT_DATA!: Booking[];

  displayedColumns = [
    'id',
    'FIO',
    'telNumber',
    'startDate',
    'endDate',
    'sumPrice',
    'action',
  ];

  dataSource = new MatTableDataSource<Booking>(this.ELEMENT_DATA);

  form: FormGroup;

  originalSource = new MatTableDataSource<Booking>(this.ELEMENT_DATA);

  size: number = 10;

  total: number;

  currentPage: number = 1;

  pageCount: number;

  pages: number[];

  telNumber: string;

  sanId: string;

  statuses: Option[] = [];

  status: string;

  startDate: Date;

  endDate: Date;

  minPrice: string;

  maxPrice: string;

  timeout: NodeJS.Timeout;

  row: Booking;

  roomClasses: DictEntity[];

  selectedSan: Sanatory;

  @ViewChild('roomModal') private roomModal: RoomForBookingComponent;

  @ViewChild('historyModal') private historyModal: HistoryForBookingComponent;

  constructor(
    private service: BookingService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private roomClassService: RoomClassService,
    private sanService: SanService
  ) {
    if (this.router.getCurrentNavigation().extras?.state?.['selectedSan'])
      this.selectedSan =
        this.router.getCurrentNavigation().extras.state['selectedSan'];
    this.endDate = new Date();
    this.startDate = new Date(
      this.endDate.getFullYear(),
      this.endDate.getMonth() - 1,
      this.endDate.getDay()
    );
    for (const [key, value] of Object.entries(BookingStatus)) {
      this.statuses.push({
        id: key,
        value: value,
      });
    }
  }

  ngOnInit(): void {
    this.getAll();
    this.getRoomClasses();
    console.log(BookingStatus['APPROVED']);
  }

  public getAll() {
    if (this.status === '0') this.status = undefined;
    this.sanId = this.route.snapshot.paramMap.get('id');
    let resp = this.service.getAll({
      startDate: this.startDate.toISOString().slice(0, 10),
      endDate: this.endDate.toISOString().slice(0, 10),
      telNumber: this.telNumber,
      page: 0,
      size: 10,
      sanId: this.sanId ? this.sanId : undefined,
      status: this.status,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
    });
    resp.subscribe((res) => {
      this.originalSource.data = res['data'] as Booking[];
      this.dataSource.data = this.originalSource.data.filter(
        (_, index) => index < this.size
      );
      this.total = res['data']['total'];
      this.calcPageCount();
    });
  }
  public editRow(id: string) {
    this.router.navigate(['/main/booking/edit', id]);
  }
  public deleteRow(row: Booking) {
    this.service
      .deleteOneById(row.id.toString())
      .subscribe(() => this.getAll());
  }

  public filterSource(value: Event) {
    this.size = Number((value.target as HTMLSelectElement).value);
    this.dataSource.data = this.originalSource.data.filter(
      (_, index) => index < this.size
    );
    this.calcPageCount();
  }

  public changeCurrentPage(value: number) {
    this.currentPage = value;
  }

  public incrementPage() {
    if (this.currentPage < this.pageCount - 1)
      this.currentPage = this.currentPage + 1;
    else this.currentPage = 1;
  }

  public decrementPage() {
    if (this.currentPage > 1) this.currentPage = this.currentPage - 1;
    else this.currentPage = this.pageCount;
  }

  public calcPageCount() {
    this.pageCount = Math.ceil(this.total / this.size);
    this.pages = [];
    for (let i = 0; i < this.pageCount; i++) {
      this.pages.push(i + 1);
    }
    if (this.size > this.total) {
      this.size = this.total;
    }
  }
  public onSearch() {
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.getAll();
    }, 1500);
  }

  public onRowClick(row: Booking) {
    this.row = row;
    this.roomModal.ngOnInit();
  }

  public clear() {
    this.sanId = undefined;
    this.maxPrice = undefined;
    this.minPrice = undefined;
    this.endDate = new Date();
    this.startDate = new Date(
      this.endDate.getFullYear(),
      this.endDate.getMonth() - 1,
      this.endDate.getDay()
    );
    this.telNumber = undefined;
    this.status = undefined;
    this.router.navigate(['/main/booking']);
    this.getAll();
  }

  public clearSelectedSan() {
    this.router.navigate(['/main/booking']);
  }

  getRoomClasses() {
    this.roomClassService.getAll().subscribe((res) => {
      this.roomClasses = res['data'];
    });
  }
  public setSanId(san: Sanatory) {
    this.selectedSan = san;
    console.log(this.selectedSan);
    this.router.navigate(['/main/booking', String(san.id)], {
      state: { selectedSan: this.selectedSan },
    });
    this.getAll();
  }

  public openHistoryModal(row: Booking) {
    this.row = row;
    this.historyModal.ngOnInit();
  }
}

@Component({
  selector: 'room-for-booking',
  templateUrl: './room-for-booking.component.html',
})
export class RoomForBookingComponent implements OnInit {
  @Input() row: Booking;

  @Input() roomClasses: DictEntity[];

  @Input() statuses: Option[] = [];

  constructor() {}

  ngOnInit(): void {}

  public getRoomClassName(id: number) {
    if (id) return this.roomClasses.find((r) => r.id === id).name;
    return '';
  }
  public formattedDate(date: string) {
    return moment(date).locale('ru').format('llll').toString().slice(0, -8);
  }
  public calendarDate(date: string) {
    return moment(date).locale('ru').calendar();
  }
  public statusName(id: string) {
    return this.statuses.find((s) => s.id === id).value;
  }
}

@Component({
  selector: 'history-for-booking',
  templateUrl: './history-for-booking.component.html',
})
export class HistoryForBookingComponent implements OnInit {
  @Input() row: Booking;

  data: BookingHistory[];

  constructor(public service: BookingService) {}

  ngOnInit(): void {
    if (this.row && this.row.id)
      this.service
        .getBookingHistoryById(this.row.id.toString())
        .subscribe((res) => (this.data = res['data'] as BookingHistory[]));
  }

  public statusText(text: string) {
    return BookingStatus[text];
  }

  public formattedDate(date: string) {
    return moment(date).locale('ru').format('lll').toString().slice(0, -8);
  }
}
