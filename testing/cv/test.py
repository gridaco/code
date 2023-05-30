import click
from pathlib import Path



@click.command()
@click.argument('i', type=click.Path(exists=True))
@click.argument('o', type=click.Path())
def main(i, o):
    ...


if __name__ == '__main__':
    main()